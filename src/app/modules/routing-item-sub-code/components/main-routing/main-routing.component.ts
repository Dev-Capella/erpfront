import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemTypeService } from '../../../item-type/services/item-type.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-main-routing',
  templateUrl: './main-routing.component.html',
  styleUrl: './main-routing.component.scss'
})
export class MainRoutingComponent extends BaseComponent implements OnInit {
  selectedData: any;
  itemTypeList: any[] = []
  itemTypeCode: string = "";
  keepLeft: boolean = true;
  keepRight: boolean = false;
  formData: FormGroup;
  menus: MenuItem[] = [
    {
      id:MenuItemActions.NEW,
      label: 'Yeni',
      icon: 'pi pi-fw pi-plus',
      command: ()=>{
        this.routingService.keepRight.next(true);
        this.routingService.selectedData.next(null);
      }
    },
    {
      id:MenuItemActions.SAVE,
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.routingService.keepRight.next(false);
      }
    },
    {
      id:MenuItemActions.SAVE_AND_NEW,
      label: 'Kaydet & Yeni',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.formData.reset();
      }
    },
    {
      id:MenuItemActions.BACK,
      label: 'Geri',
      icon: 'pi pi-arrow-left',
      command: ()=>{
        this.itemTypeService.visibleRoutingTemplate.next(false);
      }
    },
    {
      id:MenuItemActions.DELETE,
      label: 'Sil',
      icon: 'pi pi-trash',
      command: async ()=>{
        await this.deleteItemType();
      },
      disabled:true
    },
    {
      id:MenuItemActions.COPY,
      label: 'Kopyala',
      icon: 'pi pi-clone',
      disabled:true
    },
    {
      id:MenuItemActions.PRINT,
      label: 'Yazdır',
      icon: 'pi pi-print',
      disabled:true
    },
    {
      id:MenuItemActions.EDIT,
      label: 'Düzenle',
      icon: 'pi pi-file-edit',
      disabled:true
    },
    {
      id:MenuItemActions.DECODE,
      label: 'Kod Aç',
      icon: 'pi pi-code',
      disabled:true
    },
    {
      id:MenuItemActions.NEXT,
      label: 'İleri',
      icon: 'pi pi-forward',
      disabled:true
    }
  ];

  constructor(spinner: NgxSpinnerService,
    private routingService: RoutingService,
    private messageService: MessageService,
    private itemTypeService: ItemTypeService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.itemTypeService.selectedData$.subscribe(result=>{
      if(!!result){
        this.itemTypeCode = result.code;
        this.itemTypeList = [result]
      }
    })


    this.routingService.keepLeft$.subscribe(result=>{
        this.keepLeft = result;
    });

    this.routingService.keepRight$.subscribe(result=>{
      this.keepRight = result;
      this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
      this.menus = [...this.menus];
    });

    this.routingService.selectedData$.subscribe(result=>{
      if(!!result){
        this.selectedData = result;
        this.menus.filter(item=>item.id==MenuItemActions.DELETE)[0].disabled=false;   
      }else{
        this.menus.filter(item=>item.id==MenuItemActions.DELETE)[0].disabled=true;
      }
      this.menus = [...this.menus];
    });

  }

  async onSubmit(){
    var request = {
      id: this.formData.value?.id,
      code: this.formData.value?.code,
      shortText: this.formData.value?.shortText,
      longText: this.formData.value?.longText,
      searchText:this.formData.value?.searchText,
      position: this.formData.value?.position,
      length: this.formData.value?.length,
      itemType: {code: this.itemTypeCode },
      outputSeparator: this.formData.value?.outputSeparator
    }

    this.showSpinner();
    await this.routingService.saveRoutingItemSubCode(request,()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Routing Item Sub Code level başarıyla Kaydedilmiştir.'});
    this.routingService.isRefreshList.next(true);
    this.formData.reset();
  }

  async deleteItemType(){
    this.showSpinner();
    await this.routingService.deleteRoutingItemSubCodeByCode(this.selectedData.code, ()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Routing Item Sub Code başarıyla silinmiştir.'});
    this.routingService.isRefreshList.next(true);
    this.routingService.keepRight.next(false);
  }

  getFormValue(event){
    this.formData = event;
  }
}
