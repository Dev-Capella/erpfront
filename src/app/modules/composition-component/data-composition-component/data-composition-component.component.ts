import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CompositionComponentService } from '../services/composition-component.service';

@Component({
  selector: 'app-data-composition-component',
  templateUrl: './data-composition-component.component.html',
  styleUrl: './data-composition-component.component.scss'
})
export class DataCompositionComponentComponent implements OnInit {
  compositionComponentForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  @Output() compositionComponentFormGroupValue : EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder,private compositionComponentService:CompositionComponentService) {
    
  }
  ngOnInit(): void {
    
    this.compositionComponentForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });

    this.compositionComponentService.selectedData.subscribe(result=>{
      if(!!result){
        this.compositionComponentForm.setValue(result);
      }else{
        this.compositionComponentForm.reset();
      }
    });

    this.compositionComponentFormGroupValue.emit(this.compositionComponentForm);
    this.compositionComponentForm.valueChanges.subscribe(value => {
      if(value)
        this.compositionComponentFormGroupValue.emit(this.compositionComponentForm);
    });

    this.compositionComponentService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.compositionComponentService.keepRight.subscribe(value => {
      this.keepRight=value
    })
  }

  
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.compositionComponentService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.compositionComponentService.keepRight.next(this.keepRight);
    this.compositionComponentService.selectedData.next(null);
  }
}
