import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { QualityLevelService } from '../../services/quality-level.service';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { ItemTypeService } from '../../../item-type/services/item-type.service';

@Component({
  selector: 'app-main-quality',
  templateUrl: './main-quality.component.html',
  styleUrl: './main-quality.component.scss'
})
export class MainQualityComponent extends BaseComponent implements OnInit {
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
        this.qualityLevelService.keepRight.next(true);
        this.qualityLevelService.selectedData.next(null);
      }
    },
    {
      id:MenuItemActions.SAVE,
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.qualityLevelService.keepRight.next(false);
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
        this.itemTypeService.visibleQualityTemplate.next(false);
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
    private qualityLevelService: QualityLevelService,
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


    this.qualityLevelService.keepLeft$.subscribe(result=>{
        this.keepLeft = result;
    });

    this.qualityLevelService.keepRight$.subscribe(result=>{
      this.keepRight = result;
      this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
      this.menus = [...this.menus];
    });

    this.qualityLevelService.selectedData$.subscribe(result=>{
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
      level: this.formData.value?.level,
      itemType: {code: this.itemTypeCode }
    }

    this.showSpinner();
    await this.qualityLevelService.saveQualityLevel(request,()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Quality level başarıyla Kaydedilmiştir.'});
    this.qualityLevelService.isRefreshList.next(true);
    this.formData.reset();
  }

  async deleteItemType(){
    this.showSpinner();
    await this.qualityLevelService.deleteQualityLevelByCode(this.selectedData.code, ()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'UoM başarıyla silinmiştir.'});
    this.qualityLevelService.isRefreshList.next(true);
    this.qualityLevelService.keepRight.next(false);
  }

  getFormValue(event){
    this.formData = event;
  }

}
