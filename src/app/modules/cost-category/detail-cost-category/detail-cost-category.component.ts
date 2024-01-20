import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostCategoryService } from '../services/cost-category.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-cost-category',
  templateUrl: './detail-cost-category.component.html',
  styleUrl: './detail-cost-category.component.scss'
})
export class DetailCostCategoryComponent extends BaseComponent implements OnInit {
  costCategoryForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private costCategoryService:CostCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.costCategoryForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
    await this.getCostCategoryByCode();
  }

  get formControls(){
    return this.costCategoryForm.controls;
  }

  async getCostCategoryByCode(){
    this.showSpinner();
    var result = await this.costCategoryService.getCostCategoryByCode(this.code, ()=> this.hideSpinner());
    this.costCategoryForm.setValue(result);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
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
          id: value?.id,
          code: value?.code,
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
    this.router.navigate(['/cost-category-list'])
  }
}
