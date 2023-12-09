import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UnitOfMeasureService } from '../../services/unit-of-measure.service';

@Component({
  selector: 'app-data-uom',
  templateUrl: './data-uom.component.html',
  styleUrl: './data-uom.component.scss'
})
export class DataUomComponent implements OnInit {
  uomForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  unitOfMeasureTypes: any[] = [
    {code: 'NUMBER', name: 'Number'},
    {code: 'WEIGHT', name: 'Weight'},
    {code: 'VOLUME', name: 'Volume'},
    {code: 'LENGTH', name: 'Length'},
    {code: 'AREA', name: 'Area'},
    {code: 'CAPACITY', name: 'Capacity'},
    {code: 'TIME', name: 'Time'},
    {code: 'TEMPERATURE', name: 'Temperature'},
    {code: 'QUANTITY', name: 'Quantity'},
    {code: 'PACKAGING', name: 'Packaging'},
    {code: 'MEASUREMENT', name: 'Measurement'}
  ]
  constructor(private formBuilder: FormBuilder,private unitOfMeasureService:UnitOfMeasureService) {
    
  }
  ngOnInit(): void {
    
    this.uomForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      unitOfMeasureType: new FormControl(null)
    });

    this.unitOfMeasureService.selectedData.subscribe(result=>{
      if(!!result){
        this.uomForm.setValue(result);
      }else{
        this.uomForm.reset();
      }
    });

    this.uomFormGroupValue.emit(this.uomForm);
    this.uomForm.valueChanges.subscribe(value => {
      if(value)
        this.uomFormGroupValue.emit(this.uomForm);
    });

    this.unitOfMeasureService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.unitOfMeasureService.keepRight.subscribe(value => {
      this.keepRight=value
    })
  }

  @Output() uomFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.unitOfMeasureService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.unitOfMeasureService.keepRight.next(this.keepRight);
    this.unitOfMeasureService.selectedData.next(null);
  }
}
