import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostCategoryService } from '../services/cost-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-cost-category',
  templateUrl: './main-cost-category.component.html',
  styleUrl: './main-cost-category.component.scss'
})
export class MainCostCategoryComponent extends BaseComponent implements OnInit {
  costCategoryList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private costCategoryService: CostCategoryService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getCostCategoryList();
  }

  async getCostCategoryList() {
    this.showSpinner();
    this.costCategoryList = await this.costCategoryService.getCostCategories(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/cost-category-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-cost-category',
      header: 'Transaction Confirmation',
      message: 'The cost category is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.costCategoryService.deleteCostCategoryByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Cost category has been removed successfully.'});
        await this.getCostCategoryList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/cost-category-list/new'])
  }
}
