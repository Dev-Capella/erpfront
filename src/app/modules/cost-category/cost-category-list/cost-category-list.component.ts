import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostCategoryService } from '../services/cost-category.service';
import { BreadcrumbService } from '../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-cost-category-list',
  templateUrl: './cost-category-list.component.html',
  styleUrl: './cost-category-list.component.scss'
})
export class CostCategoryListComponent extends BaseComponent implements OnInit {
  selectedCostCategory: any = null;
  costCategoryList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private costCategoryService: CostCategoryService,
    private breadcrumbService: BreadcrumbService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {label: 'Cost Category Listesi', routerLink: ['/cost-category-list']}
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getCostCategoryList();
    this.costCategoryService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getCostCategoryList();
        this.costCategoryService.isRefreshList.next(false);
      }
    });

    this.costCategoryService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedCostCategory = null;
      }
    });
  }

  async getCostCategoryList(){
    this.showSpinner();
    this.costCategoryList = await this.costCategoryService.getCostCategories(()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.costCategoryService.keepRight.next(true);
    this.showSpinner();
    var data = await this.costCategoryService.getCostCategoryByCode(event.data.code,()=>this.hideSpinner());
    this.costCategoryService.selectedData.next(data);
  }

  onRowUnselect(){
    this.costCategoryService.keepRight.next(false);
    this.costCategoryService.selectedData.next(null);
  }
}
