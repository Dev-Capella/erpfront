import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManufacturerService } from '../../services/manufacturer.service';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrl: './manufacturer-list.component.scss'
})
export class ManufacturerListComponent extends BaseComponent implements OnInit {
  selectedManufacturer: any = null;
  manufacturerList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private manufacturerService: ManufacturerService,
    private breadcrumbService: BreadcrumbService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {label: 'Manufacturer Listesi', routerLink: ['/manufacturer-list']}
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getManufacturerList();
    this.manufacturerService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getManufacturerList();
        this.manufacturerService.isRefreshList.next(false);
      }
    });

    this.manufacturerService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedManufacturer = null;
      }
    });
  }

  async getManufacturerList(){
    this.showSpinner();
    this.manufacturerList = await this.manufacturerService.getManufacturers(()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.manufacturerService.keepRight.next(true);
    this.showSpinner();
    var data = await this.manufacturerService.getManufacturerByCode(event.data.code,()=>this.hideSpinner());
    this.manufacturerService.selectedData.next(data);
  }

  onRowUnselect(){
    this.manufacturerService.keepRight.next(false);
    this.manufacturerService.selectedData.next(null);
  }

}
