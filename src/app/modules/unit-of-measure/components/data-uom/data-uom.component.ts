import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-uom',
  templateUrl: './data-uom.component.html',
  styleUrl: './data-uom.component.scss'
})
export class DataUomComponent implements OnInit {
  uomForm: FormGroup;
  unitOfMeasureTypes: any[] = [
    {code: 'NUMBER', name: 'NUMBER'},
    {code: 'WEIGHT', name: 'WEIGHT'},
    {code: 'VOLUME', name: 'VOLUME'},
    {code: 'LENGTH', name: 'LENGTH'},
    {code: 'AREA', name: 'AREA'},
    {code: 'CAPACITY', name: 'CAPACITY'},
    {code: 'TIME', name: 'TIME'},
    {code: 'TEMPERATURE', name: 'TEMPERATURE'},
    {code: 'QUANTITY', name: 'QUANTITY'},
    {code: 'PACKAGING', name: 'PACKAGING'},
    {code: 'MEASUREMENT', name: 'MEASUREMENT'}
  ]
  constructor(private formBuilder: FormBuilder) {
    
  }
  ngOnInit(): void {
    this.uomForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      unitOfMeasureType: new FormControl(null)
    })
    this.uomFormGroupValue.emit(this.uomForm);
    this.uomForm.valueChanges.subscribe(value => {
      if(value)
        this.uomFormGroupValue.emit(this.uomForm);
    })
  }
  keepLeft: boolean = true;
  keepRight: boolean = true;
  @Output() keepLeftEvent : EventEmitter<any> = new EventEmitter();
  @Output() keepRightEvent : EventEmitter<any> = new EventEmitter();

  @Output() uomFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.keepLeftEvent.emit(this.keepLeft)
  }

  closeSplitter(){
    this.keepRight = false;
    this.keepRightEvent.emit(this.keepRight)
  }
}
