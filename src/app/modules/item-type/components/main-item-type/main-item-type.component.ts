import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemTypeService } from '../../services/item-type.service';
import { FunctionsMenuItemActions } from '../../../../shared/enums/functions-menu-item-actions.enum';

@Component({
  selector: 'app-main-item-type',
  templateUrl: './main-item-type.component.html',
  styleUrl: './main-item-type.component.scss'
})
export class MainItemTypeComponent extends BaseComponent implements OnInit {
  selectedData: any;
  keepLeft: boolean = true;
  keepRight: boolean = false;
  formData: FormGroup;
  visibleSubcodeTemplate: boolean = false;
  visibleQualityTemplate: boolean = false;
  visibleBoMTemplate: boolean = false;
  visibleRoutingTemplate: boolean = false;
  functionMenus: MenuItem[] = [
    {
      id: FunctionsMenuItemActions.QUALITY,
      label: 'Quality',
      disabled: true,
      command: ()=>{
        this.openQualityTemplate();
      }
    },
    {
      id: FunctionsMenuItemActions.SUBCODE,
      label: 'Subcode',
      disabled: true,
      command: ()=>{
        this.openSubcodeTemplate();
      }
    },
    {
      id: FunctionsMenuItemActions.SUBCODE,
      label: 'BoM Item Sub Code',
      disabled: true,
      command: ()=>{
        this.openBoMTemplate();
      }
    },
    {
      id: FunctionsMenuItemActions.SUBCODE,
      label: 'Routing Item Sub Code',
      disabled: true,
      command: ()=>{
        this.openRoutingTemplate();
      }
    },
  ]
  menus: MenuItem[] = [
    {
      id:MenuItemActions.NEW,
      label: 'Yeni',
      icon: 'pi pi-fw pi-plus',
      command: ()=>{
        this.itemTypeService.keepRight.next(true);
        this.itemTypeService.selectedData.next(null);
      }
    },
    {
      id:MenuItemActions.SAVE,
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.itemTypeService.keepRight.next(false);
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
      disabled:true
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
    private itemTypeService: ItemTypeService,
    private messageService: MessageService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.itemTypeService.keepLeft$.subscribe(result=>{
        this.keepLeft = result;
    });

    this.itemTypeService.keepRight$.subscribe(result=>{
      this.keepRight = result;
      this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
      this.menus = [...this.menus];
    });

    this.itemTypeService.selectedData$.subscribe(result=>{
      if(!!result){
        this.selectedData = result;
        this.menus.filter(item=>item.id==MenuItemActions.DELETE)[0].disabled=false;
        this.functionMenus = this.functionMenus.map(item => {return {...item, disabled: false}})       
      }else{
        this.menus.filter(item=>item.id==MenuItemActions.DELETE)[0].disabled=true;
        this.functionMenus = this.functionMenus.map(item => {return {...item, disabled: true}}) 
      }
      this.menus = [...this.menus];
    });

    this.itemTypeService.visibleQualityTemplate$.subscribe(result=>{
        this.visibleQualityTemplate = result;
    });

    this.itemTypeService.visibleSubcodeTemplate$.subscribe(result=>{
        this.visibleSubcodeTemplate = result;
    });
    
  }

  async onSubmit(){
    var request = {
      id: this.formData.value?.id,
      code: this.formData.value?.code,
      shortText: this.formData.value?.shortText,
      longText: this.formData.value?.longText,
      searchText:this.formData.value?.searchText,
      itemNature: this.formData.value?.itemNature,
      maxCodeLength: this.formData.value?.maxCodeLength,
      sellingType: this.formData.value?.sellingType,
      valid: this.formData.value?.valid,
      managedByBox: this.formData.value?.managedByBox,
      handleComponentStatus: this.formData.value?.handleComponentStatus,
      structure: this.formData.value?.structure,
      statusAllowed: this.formData.value?.statusAllowed,
      primaryUOM: {code: this.formData.value?.primaryUOM?.code },
      secondaryUnitControlled: this.formData.value?.secondaryUnitControlled !== null,
      secondaryUOM: this.formData.value?.secondaryUOM?.code ? {code: this.formData.value?.secondaryUOM?.code } : null,
      secondaryConversionFactor: this.formData.value?.secondaryConversionFactor,
      packagingUnitControlled: this.formData.value?.packagingUnitControlled !== null,
      baseUoMPackagingType: this.formData.value?.baseUoMPackagingType,
      packagingUOM: this.formData.value?.packagingUOM?.code ? {code: this.formData.value?.packagingUOM?.code } : null,
      packagingConversionFactor: this.formData.value?.packagingConversionFactor,
      qualityControlled: this.formData.value?.qualityControlled,
      lotControlled: this.formData.value?.lotControlled,
      containerControlled: this.formData.value?.containerControlled,
      elementControlled: this.formData.value?.elementControlled,
      projectControlled: this.formData.value?.projectControlled,
      customerControlled: this.formData.value?.customerControlled,
      supplierControlled: this.formData.value?.supplierControlled
    }

    this.showSpinner();
    await this.itemTypeService.saveItemType(request,()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Item Type başarıyla Kaydedilmiştir.'});
    this.itemTypeService.isRefreshList.next(true);
    this.formData.reset();
  }

  async deleteItemType(){
    this.showSpinner();
    await this.itemTypeService.deleteItemTypeByCode(this.selectedData.code, ()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'UoM başarıyla silinmiştir.'});
    this.itemTypeService.isRefreshList.next(true);
    this.itemTypeService.keepRight.next(false);
  }

  getFormValue(event){
    this.formData = event;
  }

  openSubcodeTemplate(){
    this.visibleSubcodeTemplate = true;
  }

  openQualityTemplate(){
    this.visibleQualityTemplate = true;
  }

  openBoMTemplate(){
    this.visibleBoMTemplate = true;
  }

  openRoutingTemplate(){
    this.visibleRoutingTemplate = true;
  }
}
