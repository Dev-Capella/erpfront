import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CostCategoryService } from '../services/cost-category.service';

@Component({
  selector: 'app-data-cost-category',
  templateUrl: './data-cost-category.component.html',
  styleUrl: './data-cost-category.component.scss'
})
export class DataCostCategoryComponent implements OnInit {
  costCategoryForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  
  constructor(private formBuilder: FormBuilder,private costCategoryService:CostCategoryService) {
    
  }
  ngOnInit(): void {
    
    this.costCategoryForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });

    this.costCategoryService.selectedData.subscribe(result=>{
      if(!!result){
        this.costCategoryForm.setValue(result);
      }else{
        this.costCategoryForm.reset();
      }
    });

    this.costCategoryFormGroupValue.emit(this.costCategoryForm);
    this.costCategoryForm.valueChanges.subscribe(value => {
      if(value)
        this.costCategoryFormGroupValue.emit(this.costCategoryForm);
    });

    this.costCategoryService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.costCategoryService.keepRight.subscribe(value => {
      this.keepRight=value
    })
  }

  @Output() costCategoryFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.costCategoryService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.costCategoryService.keepRight.next(this.keepRight);
    this.costCategoryService.selectedData.next(null);
  }
}
