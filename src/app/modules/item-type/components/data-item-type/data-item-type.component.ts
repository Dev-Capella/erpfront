import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemTypeService } from '../../services/item-type.service';
import { UnitOfMeasureService } from '../../../unit-of-measure/services/unit-of-measure.service';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-data-item-type',
  templateUrl: './data-item-type.component.html',
  styleUrl: './data-item-type.component.scss'
})
export class DataItemTypeComponent extends BaseComponent implements OnInit {
  itemTypeForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  itemNatures: any[] = [
    {code: 'PRODUCT', name: 'Product'},
    {code: 'NON_STOCK_PRODUCT', name: 'Non stock product'},
    {code: 'TOOL', name: 'Tool'},
    {code: 'CONTAINER', name: 'Container'},
    {code: 'SERVICES', name: 'Services'},
    {code: 'CHARGERS', name: 'Chargers'},
    {code: 'RECIPE', name: 'Receipe'},
    {code: 'DESIGN', name: 'Design'},
    {code: 'PATTERN', name: 'Pattern'},
    {code: 'COST_ELEMENT', name: 'Cost element'},
  ]
  structures: any[] = [
    {code: 'NA', name: 'N/A'},
    {code: 'FINISHED_ITEM', name: 'Finished item'},
    {code: 'SEMI_FINISHED_ITEM', name: 'Semi finished item'},
    {code: 'RAW_MATERIAL', name: 'Raw material'},
  ]
  statusAlloweds: any[] = [
    {code: 'NA', name: 'N/A'},
    {code: 'ACTIVE', name: 'Active'},
    {code: 'SUSPENDED_ACTIVE', name: 'Suspended+Active'},
    {code: 'SUSPENDED_APPROVED_ACTIVE', name: 'Suspended+Approved+Active'},
  ]
  basePackagingTypes: any[] = [
    {code: 'PRIMARY', name: 'Primary'},
    {code: 'SECONDARY', name: 'Secondary'}
  ]
  uomList: any[] = []
  packagingUOMList: any[] = []
  secondaryUOMVisible: boolean = false;
  packagingUOMVisible: boolean = false;
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private itemTypeService:ItemTypeService,
    private unitOfMeasureService: UnitOfMeasureService) {
    super(spinner)
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
    });

  
    this.itemTypeService.selectedData.subscribe(result=>{
      if(!!result){
        this.itemTypeForm.setValue(result);
      }else{
        this.itemTypeForm.reset();
      }
    });

    this.itemTypeFormGroupValue.emit(this.itemTypeForm);
    this.itemTypeForm.valueChanges.subscribe(value => {
      if(value)
        this.itemTypeFormGroupValue.emit(this.itemTypeForm);
    });

    this.itemTypeService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.itemTypeService.keepRight.subscribe(value => {
      this.keepRight=value
    })

    await this.getUOMList();
  }

  @Output() itemTypeFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.itemTypeService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.itemTypeService.keepRight.next(this.keepRight);
    this.itemTypeService.selectedData.next(null);
  }

  async getUOMList(){
    this.showSpinner();
    this.uomList = await this.unitOfMeasureService.getUnitOfMeasures(()=> this.hideSpinner());
    this.packagingUOMList = this.uomList.filter(x=> x.unitOfMeasureType == 'PACKAGING')
  }

  changeSecondaryUoM(event){
    if(event.checked){
      this.secondaryUOMVisible = true;
    }else{
      this.secondaryUOMVisible = false;
      this.itemTypeForm.get('secondaryUOM').reset();
      this.itemTypeForm.get('secondaryConversionFactor').reset();
    }
  }

  changePackagingUoM(event){
    if(event.checked){
      this.packagingUOMVisible = true;
    }else{
      this.packagingUOMVisible = false;
      this.itemTypeForm.get('baseUoMPackagingType').reset();
      this.itemTypeForm.get('packagingUOM').reset();
      this.itemTypeForm.get('packagingConversionFactor').reset();
    }
  }
}
