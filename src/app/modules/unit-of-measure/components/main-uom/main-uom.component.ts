import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { UnitOfMeasureService } from '../../services/unit-of-measure.service';

@Component({
  selector: 'app-main-uom',
  templateUrl: './main-uom.component.html',
  styleUrl: './main-uom.component.scss',
})
export class MainUomComponent extends BaseComponent implements OnInit {
  selectedRowCode: any;
  keepLeft: boolean = true;
  keepRight: boolean = false;
  formData: FormGroup;
  menus: MenuItem[] = [
    {
      label: 'Yeni',
      icon: 'pi pi-fw pi-plus',
      command: ()=>{
        this.keepRight = true;
      }
    },
    {
      label: 'Kaydet',
      icon: 'pi pi-save',
      command: async ()=>{
        await this.onSubmit();
      }
    },
    {
      label: 'Kaydet & Yeni',
      icon: 'pi pi-save',
    },
    {
      label: 'Geri',
      icon: 'pi pi-arrow-left',
    },
    {
      label: 'Sil',
      icon: 'pi pi-trash',
      command: async ()=>{
        await this.deleteUoM();
      }
    },
    {
      label: 'Kopyala',
      icon: 'pi pi-clone',
    },
    {
      label: 'Yazdır',
      icon: 'pi pi-print',
    },
    {
      label: 'Düzenle',
      icon: 'pi pi-file-edit',
    },
    {
      label: 'Kod Aç',
      icon: 'pi pi-code',
    },
    {
      label: 'İleri',
      icon: 'pi pi-forward',
    }
  ];
  constructor(spinner: NgxSpinnerService,
    private unitOfMeasureService: UnitOfMeasureService) {
    super(spinner);
  }
  ngOnInit(): void {}

  getSelectedRow(event){
    this.selectedRowCode = event;
  }

  changeKeepLeft(event){
    this.keepLeft = event;
  }

  changeKeepRight(event){
    this.keepRight = event;
  }

  async onSubmit(){
    var request = {
      id: this.formData.value.id,
      code: this.formData.value.code,
      longText: this.formData.value.longText,
      shortText: this.formData.value.shortText,
      searchText: this.formData.value.searchText,
      unitOfMeasureType: this.formData.value.unitOfMeasureType.code
    }

    this.showSpinner();
    await this.unitOfMeasureService.saveUnitOfMeasure(request,()=> this.hideSpinner());
    
  }

  async deleteUoM(){
    this.showSpinner();
    console.log(this.selectedRowCode)
    await this.unitOfMeasureService.deleteUnitOfMeasureByCode(this.selectedRowCode, ()=> this.hideSpinner());
    this.showSpinner();
    await this.unitOfMeasureService.getUnitOfMeasures(()=> this.hideSpinner());
  }

  getFormValue(event){
    this.formData = event;
  }
}
