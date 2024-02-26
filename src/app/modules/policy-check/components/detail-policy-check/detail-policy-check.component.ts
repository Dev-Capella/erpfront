import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyCheckCategoryService } from '../../../policy-check-category/services/policy-check-category.service';
import { PolicyCheckService } from '../../services/policy-check.service';
import { PolicyService } from '../../../../shared/services/policy.service';

@Component({
  selector: 'app-detail-policy-check',
  templateUrl: './detail-policy-check.component.html',
  styleUrl: './detail-policy-check.component.scss'
})
export class DetailPolicyCheckComponent  extends BaseComponent implements OnInit {
  policyCheckForm: FormGroup;
  policyCheckCategories: any[] = []
  policies: any[] = []
  activeTab: number = 0;
  activeMenu: number = 0;
  submitted: boolean = false;
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private policyCheckService:PolicyCheckService,
    private policyService:PolicyService,
    private policyCheckCategoryService:PolicyCheckCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
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
    await this.getPolicyCheckByCode();
  }

  get formControls(){
    return this.policyCheckForm.controls;
  }

  async getPolicyCheckByCode(){
    this.showSpinner();
    var result = await this.policyCheckService.getPolicyCheckByCode(this.code, ()=> this.hideSpinner());
    this.policyCheckForm.patchValue({
      id: result.id,
      code: result.code,
      shortText: result.shortText,
      longText: result.longText,
      searchText: result.searchText,
      policyCheckCategory: this.policyCheckCategories.find(x=> x.code==result?.policyCheckCategory?.code),
      policy: this.policies.find(x=> x.code==result?.policy),
    })
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
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
          id: value?.id,
          code: value?.code,
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
