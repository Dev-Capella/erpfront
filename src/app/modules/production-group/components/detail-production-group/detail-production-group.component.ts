import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionGroupService } from '../../services/production-group.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';

@Component({
  selector: 'app-detail-production-group',
  templateUrl: './detail-production-group.component.html',
  styleUrl: './detail-production-group.component.scss'
})
export class DetailProductionGroupComponent extends BaseComponent implements OnInit {
  productionGroupForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  itemTypes: any[] = []
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private productionGroupService:ProductionGroupService,
    private itemTypeService:ItemTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
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
    await this.getProductionGroupByCode();
  }

  get formControls(){
    return this.productionGroupForm.controls;
  }

  async getProductionGroupByCode(){
    this.showSpinner();
    var result = await this.productionGroupService.getProductionGroupByCode(this.code, ()=> this.hideSpinner());
    this.productionGroupForm.patchValue({
      id: result.id,
      code: result.code,
      shortText:result.shortText,
      longText: result.longText,
      searchText: result.searchText,
      itemType: result.itemType!=null ? this.itemTypes.find(x=> x.code==result.itemType.code) : null,
    })
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
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
          id: value?.id,
          code: value?.code,
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
