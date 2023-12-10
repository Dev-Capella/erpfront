import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { QualityLevelService } from '../../services/quality-level.service';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';

@Component({
  selector: 'app-quality-list',
  templateUrl: './quality-list.component.html',
  styleUrl: './quality-list.component.scss'
})
export class QualityListComponent extends BaseComponent implements OnInit {
  selectedQualityLevel: any = null;
  qualityLevelList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private qualityLevelService: QualityLevelService,
    private breadcrumbService: BreadcrumbService,
    private itemTypeService: ItemTypeService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getQualityLevelList();
    this.qualityLevelService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getQualityLevelList();
        this.qualityLevelService.isRefreshList.next(false);
      }
    });

    this.qualityLevelService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedQualityLevel = null;
      }
    });
  }

  async getQualityLevelList(){
    this.showSpinner();
    var itemTypeCode: string = "";
    this.itemTypeService.selectedData$.subscribe(result=>{
      if(!!result){
        itemTypeCode = result.code;
      }
    })
    this.qualityLevelList = await this.itemTypeService.getQualityLevelsByItemType(itemTypeCode,()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.qualityLevelService.keepRight.next(true);
    this.showSpinner();
    var data = await this.qualityLevelService.getQualityLevelByCode(event.data.code,()=>this.hideSpinner());
    this.qualityLevelService.selectedData.next(data);
  }

  onRowUnselect(){
    this.qualityLevelService.keepRight.next(false);
    this.qualityLevelService.selectedData.next(null);
  }
}
