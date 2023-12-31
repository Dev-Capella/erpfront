import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostLevelService } from '../services/cost-level.service';
import { BreadcrumbService } from '../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-cost-level-list',
  templateUrl: './cost-level-list.component.html',
  styleUrl: './cost-level-list.component.scss'
})
export class CostLevelListComponent extends BaseComponent implements OnInit {
  selectedCostLevel: any = null;
  costLevelList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private costLevelService: CostLevelService,
    private breadcrumbService: BreadcrumbService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {label: 'Cost Level Listesi', routerLink: ['/cost-level-list']}
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getCostLevelList();
    this.costLevelService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getCostLevelList();
        this.costLevelService.isRefreshList.next(false);
      }
    });

    this.costLevelService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedCostLevel = null;
      }
    });
  }

  async getCostLevelList(){
    this.showSpinner();
    this.costLevelList = await this.costLevelService.getCostLevels(()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.costLevelService.keepRight.next(true);
    this.showSpinner();
    var data = await this.costLevelService.getCostLevelByCode(event.data.code,()=>this.hideSpinner());
    this.costLevelService.selectedData.next(data);
  }

  onRowUnselect(){
    this.costLevelService.keepRight.next(false);
    this.costLevelService.selectedData.next(null);
  }

}
