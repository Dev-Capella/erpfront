import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { FunctionsMenuItemActions } from '../../../shared/enums/functions-menu-item-actions.enum';
import { MenuItemActions } from '../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionService } from '../services/composition.service';

@Component({
  selector: 'app-main-composition',
  templateUrl: './main-composition.component.html',
  styleUrl: './main-composition.component.scss'
})
export class MainCompositionComponent extends BaseComponent implements OnInit {
  selectedData: any;
  keepLeft: boolean = true;
  keepRight: boolean = false;
  formData: FormGroup;
  visibleCompositionDetailTemplate: boolean = false;
  functionMenus: MenuItem[] = [
    {
      id: FunctionsMenuItemActions.DETAIL,
      label: 'Detail',
      disabled: true,
      command: ()=>{
        this.openCompositionDetailTemplate();
      }
    },
  ]
  menus: MenuItem[] = [
    {
      id:MenuItemActions.NEW,
      label: 'Yeni',
      icon: 'pi pi-fw pi-plus',
      command: ()=>{
        this.compositionService.keepRight.next(true);
        this.compositionService.selectedData.next(null);
      }
    },
    {
      id:MenuItemActions.SAVE,
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.compositionService.keepRight.next(false);
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
        await this.deleteComposition();
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
    private compositionService: CompositionService,
    private messageService: MessageService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.compositionService.keepLeft$.subscribe(result=>{
        this.keepLeft = result;
    });

    this.compositionService.keepRight$.subscribe(result=>{
      this.keepRight = result;
      this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
      this.menus = [...this.menus];
    });

    this.compositionService.selectedData$.subscribe(result=>{
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

    this.compositionService.visibleCompositionDetailTemplate$.subscribe(result=>{
        this.visibleCompositionDetailTemplate = result;
    });

  }

  async onSubmit(){
    var request = {
      id: this.formData.value?.id,
      code: this.formData.value?.code,
      shortText: this.formData.value?.shortText,
      longText: this.formData.value?.longText,
      searchText:this.formData.value?.searchText,
      valid: this.formData.value?.valid
    }

    this.showSpinner();
    await this.compositionService.saveComposition(request,()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Composition başarıyla Kaydedilmiştir.'});
    this.compositionService.isRefreshList.next(true);
    this.formData.reset();
  }

  async deleteComposition(){
    this.showSpinner();
    await this.compositionService.deleteCompositionByCode(this.selectedData.code, ()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Composition başarıyla silinmiştir.'});
    this.compositionService.isRefreshList.next(true);
    this.compositionService.keepRight.next(false);
  }

  getFormValue(event){
    this.formData = event;
  }

  openCompositionDetailTemplate(){
    this.visibleCompositionDetailTemplate = true;
  }

}
