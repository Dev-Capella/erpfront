import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ItemSubCodeCheckTypeService } from '../../services/item-sub-code-check-type.service';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { DomainModelService } from '../../../../shared/services/domain-model.service';

@Component({
  selector: 'app-new-item-sub-code-check-type',
  templateUrl: './new-item-sub-code-check-type.component.html',
  styleUrl: './new-item-sub-code-check-type.component.scss'
})
export class NewItemSubCodeCheckTypeComponent extends BaseComponent implements OnInit  {
  itemSubCodeCheckTypeForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  domainModels: any[] = []
  checkTypes: any[] = [
    { code: 'NONE', name: 'NONE' },
    { code: 'ALPHA_NUMERIC', name: 'ALPHA_NUMERIC' },
    { code: 'ALPHABETIC', name: 'ALPHABETIC' },
    { code: 'NUMERIC', name: 'NUMERIC' },
    { code: 'ANYTHING', name: 'ANYTHING' },
  ]
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private itemSubCodeCheckTypeService: ItemSubCodeCheckTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private domainModelService: DomainModelService) {
    super(spinner);
    
  }
  async ngOnInit(): Promise<void> {
    this.itemSubCodeCheckTypeForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      relatedItem: new FormControl(null),
      checkType: new FormControl(null),
    });
    await this.getAllDomainModels();
  }

  get formControls(){
    return this.itemSubCodeCheckTypeForm.controls;
  }

  async getAllDomainModels(){
    this.showSpinner();
    this.domainModels = await this.domainModelService.getAllDomainModels(()=> this.hideSpinner());
  }

  save(value){
    if(this.itemSubCodeCheckTypeForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-item-sub-code-check-type',
      header: 'Transaction Confirmation',
      message: 'The item sub code check type is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          relatedItem: value?.relatedItem,
          checkType: value?.checkType
        }
        this.showSpinner();
        await this.itemSubCodeCheckTypeService.saveItemSubCodeCheckType(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Item sub code check type has been saved successfully.'});
        this.router.navigate(['/item-sub-code-check-type-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/item-sub-code-check-type-list'])
  }
}
