import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';
import { ItemSubCodeType } from '../../../../shared/enums/item-sub-code-type.enum';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent extends BaseComponent implements OnInit {
  costLevelForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  itemTypes: any[] = []
  subCodes: any[] = []
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private productService:ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private itemTypeService: ItemTypeService) {
    super(spinner);
    
  }
  async ngOnInit(): Promise<void> {
    this.costLevelForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      itemType: new FormControl(null),
    });
    await this.getItemTypes();
  }

  get formControls(){
    return this.costLevelForm.controls;
  }

  async getItemTypes(){
    this.showSpinner();
    this.itemTypes = await this.itemTypeService.getItemTypes(()=> this.hideSpinner());
  }

  changeItemType(event){
    this.subCodes = []
    console.log(event.itemSubCodes)
    this.subCodes = event.itemSubCodes.filter(x=> x.type==ItemSubCodeType.PRIMARY);
  }

  save(value){
    if(this.costLevelForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-cost-level',
      header: 'Transaction Confirmation',
      message: 'The cost level is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        await this.productService.saveProduct(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Cost level has been saved successfully.'});
        this.router.navigate(['/cost-level-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/cost-level-list'])
  }
}
