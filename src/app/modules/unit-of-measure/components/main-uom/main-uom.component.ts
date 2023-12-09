import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { UnitOfMeasureService } from '../../services/unit-of-measure.service';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';

@Component({
  selector: 'app-main-uom',
  templateUrl: './main-uom.component.html',
  styleUrl: './main-uom.component.scss',
})
export class MainUomComponent extends BaseComponent implements OnInit {
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
        this.unitOfMeasureService.keepRight.next(true);
        this.unitOfMeasureService.selectedData.next(null);
      }
    },
    {
      id:MenuItemActions.SAVE,
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.unitOfMeasureService.keepRight.next(false);
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
    private unitOfMeasureService: UnitOfMeasureService,
    private messageService: MessageService,private cdr: ChangeDetectorRef) {
    super(spinner);
  }
  ngOnInit(): void {
    this.unitOfMeasureService.keepLeft$.subscribe(result=>{
        this.keepLeft = result;
    });

    this.unitOfMeasureService.keepRight$.subscribe(result=>{
      this.keepRight = result;
      this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
      this.menus = [...this.menus];
    });

    this.unitOfMeasureService.selectedData$.subscribe(result=>{
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
      unitOfMeasureType: this.formData.value?.unitOfMeasureType
    }

    this.showSpinner();
    await this.unitOfMeasureService.saveUnitOfMeasure(request,()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'UoM başarıyla Kaydedilmiştir.'});
    this.unitOfMeasureService.isRefreshList.next(true);
    this.formData.reset();
  }

  async deleteUoM(){
    this.showSpinner();
    await this.unitOfMeasureService.deleteUnitOfMeasureByCode(this.selectedData.code, ()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'UoM başarıyla silinmiştir.'});
    this.unitOfMeasureService.isRefreshList.next(true);
    this.unitOfMeasureService.keepRight.next(false);
  }

  getFormValue(event){
    this.formData = event;
  }
}
