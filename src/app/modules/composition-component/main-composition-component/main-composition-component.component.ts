import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionComponentService } from '../services/composition-component.service';

@Component({
  selector: 'app-main-composition-component',
  templateUrl: './main-composition-component.component.html',
  styleUrl: './main-composition-component.component.scss'
})
export class MainCompositionComponentComponent extends BaseComponent implements OnInit {
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
        this.compositionComponentService.keepRight.next(true);
        this.compositionComponentService.selectedData.next(null);
      }
    },
    {
      id:MenuItemActions.SAVE,
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.compositionComponentService.keepRight.next(false);
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
    private compositionComponentService: CompositionComponentService,
    private messageService: MessageService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.compositionComponentService.keepLeft$.subscribe(result=>{
        this.keepLeft = result;
    });

    this.compositionComponentService.keepRight$.subscribe(result=>{
      this.keepRight = result;
      this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
      this.menus = [...this.menus];
    });

    this.compositionComponentService.selectedData$.subscribe(result=>{
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
    await this.compositionComponentService.saveCompositionComponent(request,()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Composition component başarıyla Kaydedilmiştir.'});
    this.compositionComponentService.isRefreshList.next(true);
    this.formData.reset();
  }

  async deleteUoM(){
    this.showSpinner();
    await this.compositionComponentService.deleteCompositionComponentByCode(this.selectedData.code, ()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Composition component başarıyla silinmiştir.'});
    this.compositionComponentService.isRefreshList.next(true);
    this.compositionComponentService.keepRight.next(false);
  }

  getFormValue(event){
    this.formData = event;
  }
}
