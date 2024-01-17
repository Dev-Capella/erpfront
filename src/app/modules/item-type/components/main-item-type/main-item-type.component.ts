import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemTypeService } from '../../services/item-type.service';
import { FunctionsMenuItemActions } from '../../../../shared/enums/functions-menu-item-actions.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-item-type',
  templateUrl: './main-item-type.component.html',
  styleUrl: './main-item-type.component.scss'
})
export class MainItemTypeComponent extends BaseComponent implements OnInit {

  menus: MenuItem[] = [
  {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        this.detail(this.activeItem);
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: async () => {
        await this.delete(this.activeItem);
      }
    }
  ];
  activeItem: any;
  items: MenuItem[] = [{
    label: 'Options',
    items: [{
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        this.detail(this.activeItem);
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: async () => {
        await this.delete(this.activeItem);
      }
    }
    ]
  }
  ];


  itemTypeList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private itemTypeService: ItemTypeService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }
  // ngOnInit(): void {
  //   this.itemTypeService.keepLeft$.subscribe(result=>{
  //       this.keepLeft = result;
  //   });

  //   this.itemTypeService.keepRight$.subscribe(result=>{
  //     this.keepRight = result;
  //     this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
  //     this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
  //     this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
  //     this.menus = [...this.menus];
  //   });

  //   this.itemTypeService.selectedData$.subscribe(result=>{
  //     if(!!result){
  //       this.selectedData = result;
  //       this.menus.filter(item=>item.id==MenuItemActions.DELETE)[0].disabled=false;
  //       this.functionMenus = this.functionMenus.map(item => {return {...item, disabled: false}})       
  //     }else{
  //       this.menus.filter(item=>item.id==MenuItemActions.DELETE)[0].disabled=true;
  //       this.functionMenus = this.functionMenus.map(item => {return {...item, disabled: true}}) 
  //     }
  //     this.menus = [...this.menus];
  //   });

  //   this.itemTypeService.visibleQualityTemplate$.subscribe(result=>{
  //       this.visibleQualityTemplate = result;
  //   });

  //   this.itemTypeService.visibleSubcodeTemplate$.subscribe(result=>{
  //       this.visibleSubcodeTemplate = result;
  //   });

  //   this.itemTypeService.visibleBoMTemplate$.subscribe(result=>{
  //       this.visibleBoMTemplate = result;
  //   });

  //   this.itemTypeService.visibleRoutingTemplate$.subscribe(result=>{
  //     this.visibleRoutingTemplate = result;
  //   });
    
  // }

  // async onSubmit(){
  //   var request = {
  //     id: this.formData.value?.id,
  //     code: this.formData.value?.code,
  //     shortText: this.formData.value?.shortText,
  //     longText: this.formData.value?.longText,
  //     searchText:this.formData.value?.searchText,
  //     itemNature: this.formData.value?.itemNature,
  //     maxCodeLength: this.formData.value?.maxCodeLength,
  //     sellingType: this.formData.value?.sellingType,
  //     valid: this.formData.value?.valid,
  //     managedByBox: this.formData.value?.managedByBox,
  //     handleComponentStatus: this.formData.value?.handleComponentStatus,
  //     structure: this.formData.value?.structure,
  //     statusAllowed: this.formData.value?.statusAllowed,
  //     primaryUOM: {code: this.formData.value?.primaryUOM?.code },
  //     secondaryUnitControlled: this.formData.value?.secondaryUnitControlled !== null,
  //     secondaryUOM: this.formData.value?.secondaryUOM?.code ? {code: this.formData.value?.secondaryUOM?.code } : null,
  //     secondaryConversionFactor: this.formData.value?.secondaryConversionFactor,
  //     packagingUnitControlled: this.formData.value?.packagingUnitControlled !== null,
  //     baseUoMPackagingType: this.formData.value?.baseUoMPackagingType,
  //     packagingUOM: this.formData.value?.packagingUOM?.code ? {code: this.formData.value?.packagingUOM?.code } : null,
  //     packagingConversionFactor: this.formData.value?.packagingConversionFactor,
  //     qualityControlled: this.formData.value?.qualityControlled,
  //     lotControlled: this.formData.value?.lotControlled,
  //     containerControlled: this.formData.value?.containerControlled,
  //     elementControlled: this.formData.value?.elementControlled,
  //     projectControlled: this.formData.value?.projectControlled,
  //     customerControlled: this.formData.value?.customerControlled,
  //     supplierControlled: this.formData.value?.supplierControlled
  //   }

  //   this.showSpinner();
  //   await this.itemTypeService.saveItemType(request,()=> this.hideSpinner());
  //   this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Item Type başarıyla Kaydedilmiştir.'});
  //   this.itemTypeService.isRefreshList.next(true);
  //   this.formData.reset();
  // }

  // async deleteItemType(){
  //   this.showSpinner();
  //   await this.itemTypeService.deleteItemTypeByCode(this.selectedData.code, ()=> this.hideSpinner());
  //   this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'UoM başarıyla silinmiştir.'});
  //   this.itemTypeService.isRefreshList.next(true);
  //   this.itemTypeService.keepRight.next(false);
  // }

  // getFormValue(event){
  //   this.formData = event;
  // }

  // openSubcodeTemplate(){
  //   this.visibleSubcodeTemplate = true;
  // }

  // openQualityTemplate(){
  //   this.visibleQualityTemplate = true;
  // }

  // openBoMTemplate(){
  //   this.visibleBoMTemplate = true;
  // }

  // openRoutingTemplate(){
  //   this.visibleRoutingTemplate = true;
  // }

  async ngOnInit(): Promise<void> {
    await this.getItemTypes();
  }

  async getItemTypes() {
    this.showSpinner();
    this.itemTypeList = await this.itemTypeService.getItemTypes(() => this.hideSpinner());
  }

  async detail(activeItem) {
    this.router.navigate(['/item-type-list/',activeItem.code])
  }

  async delete(activeItem) {
    this.confirmationService.confirm({
      key: 'delete-uom',
      header: 'Transaction Confirmation',
      message: 'The unit of measurement is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.itemTypeService.deleteItemTypeByCode(activeItem.code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Unit of measure has been removed successfully.'});
        await this.getItemTypes();
      }
  });
   
  }

  new() {
    this.router.navigate(['/item-type-list/new'])
  }

  handleMenu(item){
    this.activeItem = item;
  }
}
