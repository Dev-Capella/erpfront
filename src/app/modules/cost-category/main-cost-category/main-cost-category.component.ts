import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostCategoryService } from '../services/cost-category.service';

@Component({
  selector: 'app-main-cost-category',
  templateUrl: './main-cost-category.component.html',
  styleUrl: './main-cost-category.component.scss'
})
export class MainCostCategoryComponent extends BaseComponent implements OnInit {
  selectedData: any;
  keepLeft: boolean = true;
  keepRight: boolean = false;
  formData: FormGroup;
  
  menus: MenuItem[] = [
    {
      id:MenuItemActions.NEW,
      label: 'Yeni',
      icon: 'pi pi-fw pi-plus',
      command: ()=>{
        this.costCategoryService.keepRight.next(true);
        this.costCategoryService.selectedData.next(null);
      }
    },
    {
      id:MenuItemActions.SAVE,
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.costCategoryService.keepRight.next(false);
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
        await this.deleteUoM();
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
    private costCategoryService: CostCategoryService,
    private messageService: MessageService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.costCategoryService.keepLeft$.subscribe(result=>{
        this.keepLeft = result;
    });

    this.costCategoryService.keepRight$.subscribe(result=>{
      this.keepRight = result;
      this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
      this.menus = [...this.menus];
    });

    this.costCategoryService.selectedData$.subscribe(result=>{
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
      longText: this.formData.value?.longText,
      shortText: this.formData.value?.shortText,
      searchText: this.formData.value?.searchText,
    }

    this.showSpinner();
    await this.costCategoryService.saveCostCategory(request,()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Cost category başarıyla Kaydedilmiştir.'});
    this.costCategoryService.isRefreshList.next(true);
    this.formData.reset();
  }

  async deleteUoM(){
    this.showSpinner();
    await this.costCategoryService.deleteCostCategoryByCode(this.selectedData.code, ()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Cost category başarıyla silinmiştir.'});
    this.costCategoryService.isRefreshList.next(true);
    this.costCategoryService.keepRight.next(false);
  }

  getFormValue(event){
    this.formData = event;
  }
}