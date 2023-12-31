import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-routing-list',
  templateUrl: './routing-list.component.html',
  styleUrl: './routing-list.component.scss'
})
export class RoutingListComponent extends BaseComponent implements OnInit {
  selectedRouting: any = null;
  routingList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private routingService: RoutingService,
    private itemTypeService: ItemTypeService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getRoutingList();
    this.routingService.isRefreshList$.subscribe(async (result) =>{
      if(result){
        await this.getRoutingList();
        this.routingService.isRefreshList.next(false);
      }
    });

    this.routingService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedRouting = null;
      }
    });
  }

  async getRoutingList(){
    this.showSpinner();
    var itemTypeCode: string = "";
    this.itemTypeService.selectedData$.subscribe(result=>{
      if(!!result){
        itemTypeCode = result.code;
      }
    })
    this.routingList = await this.itemTypeService.getRoutingItemSubCodeByItemType(itemTypeCode,()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.routingService.keepRight.next(true);
    this.showSpinner();
    var data = await this.routingService.getRoutingItemSubCodeByCode(event.data.code,()=>this.hideSpinner());
    this.routingService.selectedData.next(data);
  }

  onRowUnselect(){
    this.routingService.keepRight.next(false);
    this.routingService.selectedData.next(null);
  }
}
