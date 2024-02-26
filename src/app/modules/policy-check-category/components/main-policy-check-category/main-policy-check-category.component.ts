import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { PolicyCheckCategoryService } from '../../services/policy-check-category.service';

@Component({
  selector: 'app-main-policy-check-category',
  templateUrl: './main-policy-check-category.component.html',
  styleUrl: './main-policy-check-category.component.scss'
})
export class MainPolicyCheckCategoryComponent extends BaseComponent implements OnInit{
  policyCheckCategoryList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private policyCheckCategoryService: PolicyCheckCategoryService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getPolicyCheckCategoryList();
  }

  async getPolicyCheckCategoryList() {
    this.showSpinner();
    this.policyCheckCategoryList = await this.policyCheckCategoryService.getPolicyCheckCategories(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/policy-check-category-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-policy-check-category',
      header: 'Transaction Confirmation',
      message: 'The policy check category is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.policyCheckCategoryService.deletePolicyCheckCategoryByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Policy check category has been removed successfully.'});
        await this.getPolicyCheckCategoryList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/policy-check-category-list/new'])
  }
}
