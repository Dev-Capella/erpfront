import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  selectedUoM: any = null;
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
    this.unitOfMeasureService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getUnitOfMeasureList();
        this.unitOfMeasureService.isRefreshList.next(false);
      }
    });

    this.unitOfMeasureService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedUoM = null;
      }
    });
  }

  async getUnitOfMeasureList(){
    this.showSpinner();
    this.unitOfMeasureList = await this.unitOfMeasureService.getUnitOfMeasures(()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.unitOfMeasureService.keepRight.next(true);
    this.showSpinner();
    var data = await this.unitOfMeasureService.getUnitOfMeasureByCode(event.data.code,()=>this.hideSpinner());
    this.unitOfMeasureService.selectedData.next(data);
  }

  onRowUnselect(){
    this.unitOfMeasureService.keepRight.next(false);
    this.unitOfMeasureService.selectedData.next(null);
  }

}
