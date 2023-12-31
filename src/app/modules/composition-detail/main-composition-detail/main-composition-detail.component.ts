import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionDetailService } from '../services/composition-detail.service';
import { CompositionService } from '../../composition/services/composition.service';

@Component({
  selector: 'app-main-composition-detail',
  templateUrl: './main-composition-detail.component.html',
  styleUrl: './main-composition-detail.component.scss'
})
export class MainCompositionDetailComponent extends BaseComponent implements OnInit {
  selectedData: any;
  compositionCode: string = "";
  keepLeft: boolean = true;
  keepRight: boolean = false;
  formData: FormGroup;
  compositionList: any[] = []
  menus: MenuItem[] = [
    {
      id:MenuItemActions.NEW,
      label: 'Yeni',
      icon: 'pi pi-fw pi-plus',
      command: ()=>{
        this.compositionDetailService.keepRight.next(true);
        this.compositionDetailService.selectedData.next(null);
      }
    },
    {
      id:MenuItemActions.SAVE,
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
        this.compositionDetailService.keepRight.next(false);
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
        this.compositionService.visibleCompositionDetailTemplate.next(false);
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
    private compositionDetailService: CompositionDetailService,
    private compositionService: CompositionService,
    private messageService: MessageService) {
    super(spinner);
  }
  ngOnInit(): void {

    this.compositionService.selectedData$.subscribe(result=>{
      if(!!result){
        this.compositionCode = result.code;
        this.compositionList = [result]
      }
    })


    this.compositionDetailService.keepLeft$.subscribe(result=>{
        this.keepLeft = result;
    });

    this.compositionDetailService.keepRight$.subscribe(result=>{
      this.keepRight = result;
      this.menus.filter(item=>item.id==MenuItemActions.NEW)[0].disabled=this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE)[0].disabled=!this.keepRight;
      this.menus.filter(item=>item.id==MenuItemActions.SAVE_AND_NEW)[0].disabled=!this.keepRight;
      this.menus = [...this.menus];
    });

    this.compositionDetailService.selectedData$.subscribe(result=>{
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
      searchText: this.formData.value?.searchText,
      subComposition: this.formData.value?.subComposition,
      useType: this.formData.value?.useType,
      compositionComponent: {code: this.formData.value?.compositionComponent?.code },
      sequenceNumber: this.formData.value?.sequenceNumber,
      percentage: this.formData.value?.percentage,
      composition: {code: this.compositionCode }
    }

    this.showSpinner();
    await this.compositionDetailService.saveCompositionDetail(request,()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Composition detail başarıyla Kaydedilmiştir.'});
    this.compositionDetailService.isRefreshList.next(true);
    this.formData.reset();
  }

  async deleteItemType(){
    this.showSpinner();
    await this.compositionDetailService.deleteCompositionDetailByCode(this.selectedData.code, ()=> this.hideSpinner());
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Composition detail başarıyla silinmiştir.'});
    this.compositionDetailService.isRefreshList.next(true);
    this.compositionDetailService.keepRight.next(false);
  }

  getFormValue(event){
    this.formData = event;
  }
}
