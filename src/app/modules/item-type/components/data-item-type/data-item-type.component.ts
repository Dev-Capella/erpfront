import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemTypeService } from '../../services/item-type.service';

@Component({
  selector: 'app-data-item-type',
  templateUrl: './data-item-type.component.html',
  styleUrl: './data-item-type.component.scss'
})
export class DataItemTypeComponent implements OnInit {
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
  constructor(private formBuilder: FormBuilder,
    private itemTypeService:ItemTypeService) {
    
  }
  ngOnInit(): void {
    
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
}
