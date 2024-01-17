import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemTypeService } from '../../services/item-type.service';
import { UnitOfMeasureService } from '../../../unit-of-measure/services/unit-of-measure.service';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-detail-item-type',
  templateUrl: './detail-item-type.component.html',
  styleUrl: './detail-item-type.component.scss'
})
export class DetailItemTypeComponent extends BaseComponent implements OnInit {
  itemTypeForm: FormGroup;
  itemNatures: any[] = [
    { code: 'PRODUCT', name: 'Product' },
    { code: 'NON_STOCK_PRODUCT', name: 'Non stock product' },
    { code: 'TOOL', name: 'Tool' },
    { code: 'CONTAINER', name: 'Container' },
    { code: 'SERVICES', name: 'Services' },
    { code: 'CHARGERS', name: 'Chargers' },
    { code: 'RECIPE', name: 'Receipe' },
    { code: 'DESIGN', name: 'Design' },
    { code: 'PATTERN', name: 'Pattern' },
    { code: 'COST_ELEMENT', name: 'Cost element' },
  ]
  structures: any[] = [
    { code: 'NA', name: 'N/A' },
    { code: 'FINISHED_ITEM', name: 'Finished item' },
    { code: 'SEMI_FINISHED_ITEM', name: 'Semi finished item' },
    { code: 'RAW_MATERIAL', name: 'Raw material' },
  ]
  statusAlloweds: any[] = [
    { code: 'NA', name: 'N/A' },
    { code: 'ACTIVE', name: 'Active' },
    { code: 'SUSPENDED_ACTIVE', name: 'Suspended+Active' },
    { code: 'SUSPENDED_APPROVED_ACTIVE', name: 'Suspended+Approved+Active' },
  ]
  basePackagingTypes: any[] = [
    { code: 'PRIMARY', name: 'Primary' },
    { code: 'SECONDARY', name: 'Secondary' }
  ]
  uomList: any[] = []
  packagingUOMList: any[] = []
  secondaryUOMVisible: boolean = false;
  packagingUOMVisible: boolean = false;
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private itemTypeService: ItemTypeService,
    private unitOfMeasureService: UnitOfMeasureService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner)
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.itemTypeForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      itemNature: new FormControl(null),
      maxCodeLength: new FormControl(null),
      sellingType: new FormControl(false),
      valid: new FormControl(false),
      managedByBox: new FormControl(false),
      handleComponentStatus: new FormControl(false),
      structure: new FormControl(null),
      statusAllowed: new FormControl(null),
      primaryUOM: new FormControl(null),
      secondaryUnitControlled: new FormControl(false),
      secondaryUOM: new FormControl(null),
      secondaryConversionFactor: new FormControl(null),
      packagingUnitControlled: new FormControl(false),
      baseUoMPackagingType: new FormControl(null),
      packagingUOM: new FormControl(null),
      packagingConversionFactor: new FormControl(null),
      qualityControlled: new FormControl(false),
      lotControlled: new FormControl(false),
      containerControlled: new FormControl(false),
      elementControlled: new FormControl(false),
      projectControlled: new FormControl(false),
      customerControlled: new FormControl(false),
      supplierControlled: new FormControl(false),

      //bu iki alan sorulacak
      statisticalGroupControlled: new FormControl(false),
      costForStatisticalGroupControlled: new FormControl(false)
    });

    await this.getUnitOfMeasures();
    await this.getItemTypeByCode();
  }

  get formControls() {
    return this.itemTypeForm.controls;
  }

  changeSecondaryUoM(checked) {
    if (checked) {
      this.secondaryUOMVisible = true;
    } else {
      this.secondaryUOMVisible = false;
      this.itemTypeForm.get('secondaryUOM').reset();
      this.itemTypeForm.get('secondaryConversionFactor').reset();
    }
  }

  changePackagingUoM(checked) {
    if (checked) {
      this.packagingUOMVisible = true;
    } else {
      this.packagingUOMVisible = false;
      this.itemTypeForm.get('baseUoMPackagingType').reset();
      this.itemTypeForm.get('packagingUOM').reset();
      this.itemTypeForm.get('packagingConversionFactor').reset();
    }
  }

  async getUnitOfMeasures() {
    this.showSpinner();
    this.uomList = await this.unitOfMeasureService.getUnitOfMeasures(() => this.hideSpinner());
    this.packagingUOMList = this.uomList.filter(x => x.unitOfMeasureType == 'PACKAGING')
  }

  async getItemTypeByCode() {
    this.showSpinner();
    var result = await this.itemTypeService.getItemTypeByCode(this.code,() => this.hideSpinner());
    this.itemTypeForm.setValue(result);
    this.itemTypeForm.patchValue({
      primaryUOM: result.primaryUOM ? this.uomList.filter(x=> x.code==result.primaryUOM.code)[0] : null,
      secondaryUOM: result.secondaryUOM ? this.uomList.filter(x=> x.code==result.secondaryUOM.code)[0] : null,
      packagingUOM: result.packagingUOM ? this.packagingUOMList.filter(x=> x.code==result.packagingUOM.code)[0] : null
    })
    this.changeSecondaryUoM(result.secondaryUnitControlled);
    this.changePackagingUoM(result.packagingUnitControlled);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
  }

  save(value) {
    if (this.itemTypeForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-uom',
      header: 'Transaction Confirmation',
      message: 'The Item type is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          id: value?.id,
          code: value.code,
          shortText: value?.shortText,
          longText: value?.longText,
          searchText: value?.searchText,
          itemNature: value?.itemNature,
          maxCodeLength: value?.maxCodeLength,
          sellingType: value?.sellingType,
          valid: value?.valid,
          managedByBox: value?.managedByBox,
          handleComponentStatus: value?.handleComponentStatus,
          structure: value?.structure,
          statusAllowed: value?.statusAllowed,
          primaryUOM: { code: value?.primaryUOM?.code },
          secondaryUnitControlled: value?.secondaryUnitControlled !== null,
          secondaryUOM: value?.secondaryUOM?.code ? { code: value?.secondaryUOM?.code } : null,
          secondaryConversionFactor: value?.secondaryConversionFactor,
          packagingUnitControlled: value?.packagingUnitControlled !== null,
          baseUoMPackagingType: value?.baseUoMPackagingType,
          packagingUOM: value?.packagingUOM?.code ? { code: value?.packagingUOM?.code } : null,
          packagingConversionFactor: value?.packagingConversionFactor,
          qualityControlled: value?.qualityControlled,
          lotControlled: value?.lotControlled,
          containerControlled: value?.containerControlled,
          elementControlled: value?.elementControlled,
          projectControlled: value?.projectControlled,
          customerControlled: value?.customerControlled,
          supplierControlled: value?.supplierControlled
        }
        this.showSpinner();
        await this.itemTypeService.saveItemType(request, () => this.hideSpinner());
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Item type has been saved successfully.' });
        this.router.navigate(['/item-type-list'])
      }
    });

  }

  goBack() {
    this.router.navigate(['/item-type-list'])
  }
}
