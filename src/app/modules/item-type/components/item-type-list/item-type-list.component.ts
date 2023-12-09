import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemTypeService } from '../../services/item-type.service';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-item-type-list',
  templateUrl: './item-type-list.component.html',
  styleUrl: './item-type-list.component.scss'
})
export class ItemTypeListComponent extends BaseComponent implements OnInit {
  selectedItemType: any = null;
  itemTypeList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private itemTypeService: ItemTypeService,
    private breadcrumbService: BreadcrumbService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {label: 'Item Type Listesi', routerLink: ['/item-type-list']}
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getItemTypeList();
    this.itemTypeService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getItemTypeList();
        this.itemTypeService.isRefreshList.next(false);
      }
    });

    this.itemTypeService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedItemType = null;
      }
    });
  }

  async getItemTypeList(){
    this.showSpinner();
    this.itemTypeList = await this.itemTypeService.getItemTypes(()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.itemTypeService.keepRight.next(true);
    this.showSpinner();
    var data = await this.itemTypeService.getItemTypeByCode(event.data.code,()=>this.hideSpinner());
    this.itemTypeService.selectedData.next(data);
  }

  onRowUnselect(){
    this.itemTypeService.keepRight.next(false);
    this.itemTypeService.selectedData.next(null);
  }
}
