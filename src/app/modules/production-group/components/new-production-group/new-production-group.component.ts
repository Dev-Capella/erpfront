import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductionGroupService } from '../../services/production-group.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';

@Component({
  selector: 'app-new-production-group',
  templateUrl: './new-production-group.component.html',
  styleUrl: './new-production-group.component.scss'
})
export class NewProductionGroupComponent extends BaseComponent implements OnInit {
  productionGroupForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  itemTypes: any[] = []
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private productionGroupService:ProductionGroupService,
    private itemTypeService:ItemTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  async ngOnInit(): Promise<void> {
    this.productionGroupForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      itemType: new FormControl(null),
    });

    await this.getItemTypeList();
  }

  get formControls(){
    return this.productionGroupForm.controls;
  }

  async getItemTypeList(){
    this.showSpinner();
    this.itemTypes = await this.itemTypeService.getItemTypes(()=> this.hideSpinner());
  }

  save(value){
    if(this.productionGroupForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-production-group',
      header: 'Transaction Confirmation',
      message: 'The production group is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          itemType: {code: value?.itemType?.code }
        }
        this.showSpinner();
        await this.productionGroupService.saveProductionGroup(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Production group has been saved successfully.'});
        this.router.navigate(['/production-group-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/production-group-list'])
  }
}
