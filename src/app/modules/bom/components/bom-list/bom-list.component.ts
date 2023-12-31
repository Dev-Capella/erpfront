import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';
import { BoMService } from '../../services/bom.service';

@Component({
  selector: 'app-bom-list',
  templateUrl: './bom-list.component.html',
  styleUrl: './bom-list.component.scss'
})
export class BomListComponent extends BaseComponent implements OnInit {
  selectedBoM: any = null;
  BoMList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private bomService: BoMService,
    private breadcrumbService: BreadcrumbService,
    private itemTypeService: ItemTypeService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getBoMList();
    this.bomService.isRefreshList$.subscribe(async (result) =>{
      if(result){
        await this.getBoMList();
        this.bomService.isRefreshList.next(false);
      }
    });

    this.bomService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedBoM = null;
      }
    });
  }

  async getBoMList(){
    this.showSpinner();
    var itemTypeCode: string = "";
    this.itemTypeService.selectedData$.subscribe(result=>{
      if(!!result){
        itemTypeCode = result.code;
      }
    })
    this.BoMList = await this.itemTypeService.getBoMByItemType(itemTypeCode,()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.bomService.keepRight.next(true);
    this.showSpinner();
    var data = await this.bomService.getBoMByCode(event.data.code,()=>this.hideSpinner());
    this.bomService.selectedData.next(data);
  }

  onRowUnselect(){
    this.bomService.keepRight.next(false);
    this.bomService.selectedData.next(null);
  }
}
