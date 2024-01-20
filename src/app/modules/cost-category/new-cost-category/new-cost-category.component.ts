import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostCategoryService } from '../services/cost-category.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-cost-category',
  templateUrl: './new-cost-category.component.html',
  styleUrl: './new-cost-category.component.scss'
})
export class NewCostCategoryComponent extends BaseComponent implements OnInit {
  costCategoryForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private costCategoryService:CostCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.costCategoryForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
  }

  get formControls(){
    return this.costCategoryForm.controls;
  }

  save(value){
    if(this.costCategoryForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-cost-category',
      header: 'Transaction Confirmation',
      message: 'The cost category is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        await this.costCategoryService.saveCostCategory(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Cost category has been saved successfully.'});
        this.router.navigate(['/cost-category-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/cost-level-list'])
  }
}
