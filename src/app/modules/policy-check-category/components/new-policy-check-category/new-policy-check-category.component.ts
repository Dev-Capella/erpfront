import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PolicyCheckCategoryService } from '../../services/policy-check-category.service';

@Component({
  selector: 'app-new-policy-check-category',
  templateUrl: './new-policy-check-category.component.html',
  styleUrl: './new-policy-check-category.component.scss'
})
export class NewPolicyCheckCategoryComponent extends BaseComponent implements OnInit {
  policyCheckCategoryForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private policyCheckCategoryService:PolicyCheckCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.policyCheckCategoryForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
  }

  get formControls(){
    return this.policyCheckCategoryForm.controls;
  }

  save(value){
    if(this.policyCheckCategoryForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-policy-check-category',
      header: 'Transaction Confirmation',
      message: 'The policy check category is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        await this.policyCheckCategoryService.savePolicyCheckCategory(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Policy check category has been saved successfully.'});
        this.router.navigate(['/policy-check-category-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/policy-check-category-list'])
  }
}
