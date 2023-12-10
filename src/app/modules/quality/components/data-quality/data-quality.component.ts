import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { QualityLevelService } from '../../services/quality-level.service';

@Component({
  selector: 'app-data-quality',
  templateUrl: './data-quality.component.html',
  styleUrl: './data-quality.component.scss'
})
export class DataQualityComponent extends BaseComponent implements OnInit {
  qualityLevelForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  itemTypeCode: string = ""
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private qualityLevelService:QualityLevelService) {
    super(spinner)
  }
  async ngOnInit(): Promise<void> {
    this.qualityLevelForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      level: new FormControl(null)
    });
    

    this.qualityLevelService.selectedData.subscribe(result=>{
      if(!!result){
        this.qualityLevelForm.setValue(result);

      }else{
        this.qualityLevelForm.reset();
      }
    });

    this.qualityLevelFormGroupValue.emit(this.qualityLevelForm);
    this.qualityLevelForm.valueChanges.subscribe(value => {
      if(value)
        this.qualityLevelFormGroupValue.emit(this.qualityLevelForm);
    });

    this.qualityLevelService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.qualityLevelService.keepRight.subscribe(value => {
      this.keepRight=value
    })
  }

  @Output() qualityLevelFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.qualityLevelService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.qualityLevelService.keepRight.next(this.keepRight);
    this.qualityLevelService.selectedData.next(null);
  }
}
