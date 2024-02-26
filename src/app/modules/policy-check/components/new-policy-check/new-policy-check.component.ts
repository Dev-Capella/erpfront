import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PolicyCheckCategoryService } from '../../../policy-check-category/services/policy-check-category.service';
import { PolicyCheckService } from '../../services/policy-check.service';
import { PolicyService } from '../../../../shared/services/policy.service';

@Component({
  selector: 'app-new-policy-check',
  templateUrl: './new-policy-check.component.html',
  styleUrl: './new-policy-check.component.scss'
})
export class NewPolicyCheckComponent extends BaseComponent implements OnInit{
  policyCheckForm: FormGroup;
  policyCheckCategories: any[] = []
  policies: any[] = []
  activeTab: number = 0;
  activeMenu: number = 0;
  submitted: boolean = false;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private policyCheckService:PolicyCheckService,
    private policyService:PolicyService,
    private policyCheckCategoryService:PolicyCheckCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  async ngOnInit(): Promise<void> {
    this.policyCheckForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      policyCheckCategory: new FormControl(null),
      policy: new FormControl(null, [Validators.required]),
    });
    await this.getPolicyCheckCategories();
    await this.getPolicies();
  }

  get formControls(){
    return this.policyCheckForm.controls;
  }

  async getPolicyCheckCategories(){
    this.showSpinner();
    this.policyCheckCategories = await this.policyCheckCategoryService.getPolicyCheckCategories(()=> this.hideSpinner());
  }

  async getPolicies(){
    this.showSpinner();
    var result = await this.policyService.getAllPolicies(()=> this.hideSpinner());
    this.policies = result.map(x=> {return {code: x, name: x}})
  }

  save(value){
    this.submitted = true;
    if(this.policyCheckForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-policy-check',
      header: 'Transaction Confirmation',
      message: 'The policy check is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          policyCheckCategory: value.policyCheckCategory!=null ? {code: value.policyCheckCategory.code} : null,
          policy: value.policy.code
        }
        this.showSpinner();
        await this.policyCheckService.savePolicyCheck(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Policy check has been saved successfully.'});
        this.router.navigate(['/policy-check-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/policy-check-list'])
  }
}
