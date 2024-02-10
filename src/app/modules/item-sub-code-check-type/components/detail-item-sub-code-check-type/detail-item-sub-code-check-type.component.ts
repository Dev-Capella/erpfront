import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { ItemSubCodeCheckTypeService } from '../../services/item-sub-code-check-type.service';
import { DomainModelService } from '../../../../shared/services/domain-model.service';

@Component({
  selector: 'app-detail-item-sub-code-check-type',
  templateUrl: './detail-item-sub-code-check-type.component.html',
  styleUrl: './detail-item-sub-code-check-type.component.scss'
})
export class DetailItemSubCodeCheckTypeComponent extends BaseComponent implements OnInit {
  itemSubCodeCheckTypeForm: FormGroup;
  domainModels: any[] = []
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
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
    private route: ActivatedRoute,
    private router: Router,
    private domainModelService: DomainModelService) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
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
    await this.getItemSubCodeCheckTypeByCode();
  }

  get formControls(){
    return this.itemSubCodeCheckTypeForm.controls;
  }

  async getAllDomainModels(){
    this.showSpinner();
    this.domainModels = await this.domainModelService.getAllDomainModels(()=> this.hideSpinner());
  }

  async getItemSubCodeCheckTypeByCode(){
    this.showSpinner();
    var result = await this.itemSubCodeCheckTypeService.getItemSubCodeCheckTypeByCode(this.code, ()=> this.hideSpinner());
    this.itemSubCodeCheckTypeForm.setValue(result);
    this.itemSubCodeCheckTypeForm.patchValue({
      relatedItem: result.relatedItem,
      checkType: result.checkType
    });
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
  }


  save(value){
    if(this.itemSubCodeCheckTypeForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-item-sub-code-check-type',
      header: 'Transaction Confirmation',
      message: 'The cost level is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          id: value?.id,
          code: value?.code,
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
