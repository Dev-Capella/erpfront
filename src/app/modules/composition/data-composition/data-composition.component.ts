import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionService } from '../services/composition.service';

@Component({
  selector: 'app-data-composition',
  templateUrl: './data-composition.component.html',
  styleUrl: './data-composition.component.scss'
})
export class DataCompositionComponent extends BaseComponent implements OnInit {
  compositionForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  
  @Output() compositionFormGroupValue : EventEmitter<any> = new EventEmitter();
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private compositionService:CompositionService) {
    super(spinner)
  }
  async ngOnInit(): Promise<void> {
    
    this.compositionForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      valid: new FormControl(false)
    });

  
    this.compositionService.selectedData.subscribe(result=>{
      if(!!result){
        this.compositionForm.setValue(result);
      }else{
        this.compositionForm.reset();
      }
    });

    this.compositionFormGroupValue.emit(this.compositionForm);
    this.compositionForm.valueChanges.subscribe(value => {
      if(value)
        this.compositionFormGroupValue.emit(this.compositionForm);
    });

    this.compositionService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.compositionService.keepRight.subscribe(value => {
      this.keepRight=value
    })

  }

  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.compositionService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.compositionService.keepRight.next(this.keepRight);
    this.compositionService.selectedData.next(null);
  }

}
