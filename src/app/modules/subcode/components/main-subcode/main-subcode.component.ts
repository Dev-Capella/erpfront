import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemSubCodeService } from '../../services/item-sub-code.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';

@Component({
  selector: 'app-main-subcode',
  templateUrl: './main-subcode.component.html',
  styleUrl: './main-subcode.component.scss'
})
export class MainSubcodeComponent extends BaseComponent implements OnInit {
  selectedData: any;
  itemTypeCode: string = "";
  keepLeft: boolean = true;
  keepRight: boolean = false;
  formData: FormGroup;
  itemTypeList: any[] = []
  menus: MenuItem[] = [
    {
      id:MenuItemActions.NEW,
      label: 'Yeni',
      icon: 'pi pi-fw pi-plus',
      command: ()=>{
        this.itemSubCodeService.keepRight.next(true);
        this.itemSubCodeService.selectedData.next(null);
      }
    },
    {
      id:MenuItemActions.SAVE,
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.itemSubCodeService.keepRight.next(false);
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
        this.itemTypeService.visibleSubcodeTemplate.next(false);
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
    private itemSubCodeService: ItemSubCodeService,
    private itemTypeService: ItemTypeService,
    private messageService: MessageService) {
    super(spinner);
  }
  ngOnInit(): void {

    this.itemTypeService.selectedData$.subscribe(result=>{
      if(!!result){
        this.itemTypeCode = result.code;
        this.itemTypeList = [result]
      }
    })


    this.itemSubCodeService.keepLeft$.subscribe(result=>{
        this.keepLeft = result;
    });

    this.itemSubCodeService.keepRight$.subscribe(result=>{
      this.keepRight = result;
      this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
      this.menus = [...this.menus];
    });

    this.itemSubCodeService.selectedData$.subscribe(result=>{
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
      mandatory: this.formData.value?.mandatory,
      outputSeparator: this.formData.value?.outputSeparator,
      wareHouseManagement: this.formData.value?.wareHouseManagement,
      excludedCostManagement: this.formData.value?.excludedCostManagement,
      type: this.formData.value?.type,
      itemSubCodeDataType: this.formData.value?.itemSubCodeDataType,
      itemType: {code: this.itemTypeCode }
    }

    this.showSpinner();
    await this.itemSubCodeService.saveItemSubCode(request,()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Item subcode başarıyla Kaydedilmiştir.'});
    this.itemSubCodeService.isRefreshList.next(true);
    this.formData.reset();
  }

  async deleteItemType(){
    this.showSpinner();
    await this.itemSubCodeService.deleteItemSubCodeByCode(this.selectedData.code, ()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'UoM başarıyla silinmiştir.'});
    this.itemSubCodeService.isRefreshList.next(true);
    this.itemSubCodeService.keepRight.next(false);
  }

  getFormValue(event){
    this.formData = event;
  }

}
