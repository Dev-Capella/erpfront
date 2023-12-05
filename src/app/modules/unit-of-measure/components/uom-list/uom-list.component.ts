import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnitOfMeasureService } from '../../services/unit-of-measure.service';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-uom-list',
  templateUrl: './uom-list.component.html',
  styleUrl: './uom-list.component.scss'
})
export class UomListComponent extends BaseComponent implements OnInit {
  selectedUoM: any;
  unitOfMeasureList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private unitOfMeasureService: UnitOfMeasureService,
    private breadcrumbService: BreadcrumbService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {label: 'UOM Listesi', routerLink: ['/unit-of-measure-list']}
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getUnitOfMeasureList();
  }

  async getUnitOfMeasureList(){
    this.showSpinner();
    this.unitOfMeasureList = await this.unitOfMeasureService.getUnitOfMeasures(()=> this.hideSpinner());
  }


}
