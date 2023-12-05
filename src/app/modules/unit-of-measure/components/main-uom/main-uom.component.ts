import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main-uom',
  templateUrl: './main-uom.component.html',
  styleUrl: './main-uom.component.scss',
})
export class MainUomComponent extends BaseComponent implements OnInit {
  keepLeft: boolean = true;
  keepRight: boolean = false;
  menus: any[] = [
    {
      label: 'Yeni',
      icon: 'pi pi-fw pi-plus',
      command: ()=>{
        this.keepRight = true;
      }
    },
    {
      label: 'Kaydet',
      icon: 'pi pi-save'
    },
    {
      label: 'Kaydet & Yeni',
      icon: 'pi pi-save',
    },
    {
      label: 'Geri',
      icon: 'pi pi-arrow-left'
    },
    {
      label: 'Sil',
      icon: 'pi pi-trash',
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
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {}
}
