import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CostLevelService } from '../services/cost-level.service';

@Component({
  selector: 'app-data-cost-level',
  templateUrl: './data-cost-level.component.html',
  styleUrl: './data-cost-level.component.scss'
})
export class DataCostLevelComponent implements OnInit {
  costLevelForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  
  constructor(private formBuilder: FormBuilder,private costLevelService:CostLevelService) {
    
  }
  ngOnInit(): void {
    
    this.costLevelForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });

    this.costLevelService.selectedData.subscribe(result=>{
      if(!!result){
        this.costLevelForm.setValue(result);
      }else{
        this.costLevelForm.reset();
      }
    });

    this.costLevelFormGroupValue.emit(this.costLevelForm);
    this.costLevelForm.valueChanges.subscribe(value => {
      if(value)
        this.costLevelFormGroupValue.emit(this.costLevelForm);
    });

    this.costLevelService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.costLevelService.keepRight.subscribe(value => {
      this.keepRight=value
    })
  }

  @Output() costLevelFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.costLevelService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.costLevelService.keepRight.next(this.keepRight);
    this.costLevelService.selectedData.next(null);
  }
}
