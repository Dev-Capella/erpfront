import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';
import { ItemSubCodeType } from '../../../../shared/enums/item-sub-code-type.enum';
import { UnitOfMeasureService } from '../../../unit-of-measure/services/unit-of-measure.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent extends BaseComponent implements OnInit {
  productForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  itemTypes: any[] = []
  subCodes: any[] = []
  uomList: any[] = []
  conversionFactorTypes: any[] = [{code: 'SECONDARY_PER_PRIMARY', name: 'Secondary per primary'},{code: 'PRIMARY_PER_SECONDARY', name: 'Primary per secondary'}]
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private itemTypeService: ItemTypeService,
    private unitOfMeasureService: UnitOfMeasureService) {
    super(spinner);

  }
  async ngOnInit(): Promise<void> {
    this.productForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      itemType: new FormControl(null),
      productSubCodeValues: this.formBuilder.array([]),
      primaryUOM: new FormControl(null),
      costUOM: new FormControl(null),
      secondaryUOM: new FormControl(null),
      conversionFactorType: new FormControl(null),
      multiplier:new FormControl(null),
      conversionFactor: new FormControl(null),
      sellingItem: new FormControl(null),
      purchaseOrderItem: new FormControl(null),
      internalOrderItem: new FormControl(null)
    });
    await this.getItemTypes();
    await this.getUnitOfMeasures();
  }

  get formControls() {
    return this.productForm.controls;
  }

  get productSubCodeValues() {
    return this.productForm.controls['productSubCodeValues'] as FormArray;
  }

  async getItemTypes() {
    this.showSpinner();
    this.itemTypes = await this.itemTypeService.getItemTypes(() => this.hideSpinner());
  }

  async getUnitOfMeasures(){
    this.showSpinner();
    this.uomList = await this.unitOfMeasureService.getUnitOfMeasures(()=> this.hideSpinner());
  }

  async changeItemType(event) {
    this.productSubCodeValues.clear();
    var result = await this.itemTypeService.getItemSubCodesByItemTypeForProduct(event.code, ()=> this.hideSpinner());
    // const itemSubCodes = event.itemSubCodes.filter(x => x.type == ItemSubCodeType.PRIMARY);
    const formGroups = result.map(item => this.formBuilder.group({
      userGenericGroupDetail: [null],
      itemSubCode: [item],
      numericValue: [null],
      textValue: [null]
  }));

  this.productForm.setControl('productSubCodeValues', this.formBuilder.array(formGroups));
  }

  save(value) {
    if (this.productForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-product',
      header: 'Transaction Confirmation',
      message: 'The product is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        await this.productService.saveProduct(request, () => this.hideSpinner());
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Product has been saved successfully.' });
        this.router.navigate(['/product-list'])
      }
    });

  }

  goBack() {
    this.router.navigate(['/product-list'])
  }
}
