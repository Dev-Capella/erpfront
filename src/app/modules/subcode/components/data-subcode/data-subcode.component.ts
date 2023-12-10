import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemSubCodeService } from '../../services/item-sub-code.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';

@Component({
  selector: 'app-data-subcode',
  templateUrl: './data-subcode.component.html',
  styleUrl: './data-subcode.component.scss'
})
export class DataSubcodeComponent extends BaseComponent implements OnInit {
  subCodeForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  itemTypeCode: string = ""

  types: any[] = [
    {code: 'PRIMARY', name: 'Primary'},
    {code: 'SECONDARY', name: 'Secondary'}
  ]

  dataTypes: any[] = [
    {code: 'ALPHA_NUMERIC', name: 'Alpha numeric'},
    {code: 'ALPHABETIC', name: 'Alphabetic'},
    {code: 'NUMERIC', name: 'Numeric'},
    {code: 'ANYTHING', name: 'Anything'},
  ]
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private itemSubCodeService:ItemSubCodeService,
    private itemTypeService: ItemTypeService) {
    super(spinner)
  }
  async ngOnInit(): Promise<void> {
    this.subCodeForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      position: new FormControl(null),
      length: new FormControl(null),
      mandatory: new FormControl(false),
      outputSeparator: new FormControl(null),
      wareHouseManagement: new FormControl(false),
      excludedCostManagement: new FormControl(false),
      type: new FormControl(null),
      itemSubCodeDataType: new FormControl(null),
      itemType: new FormControl(null)
    });
    

    this.itemTypeService.selectedData$.subscribe(result=>{
      if(!!result){
        this.itemTypeCode = result.code;
        this.subCodeForm.patchValue({
          itemType: this.itemTypeCode
        })
      }
    })

    this.itemSubCodeService.selectedData.subscribe(result=>{
      if(!!result){
        this.subCodeForm.setValue(result);

      }else{
        this.subCodeForm.reset();
      }
    });

    this.subCodeFormGroupValue.emit(this.subCodeForm);
    this.subCodeForm.valueChanges.subscribe(value => {
      if(value)
        this.subCodeFormGroupValue.emit(this.subCodeForm);
    });

    this.itemSubCodeService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.itemSubCodeService.keepRight.subscribe(value => {
      this.keepRight=value
    })
  }

  @Output() subCodeFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.itemSubCodeService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.itemSubCodeService.keepRight.next(this.keepRight);
    this.itemSubCodeService.selectedData.next(null);
  }
}
