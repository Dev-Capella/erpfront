import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BoMService } from '../../services/bom.service';

@Component({
  selector: 'app-data-bom',
  templateUrl: './data-bom.component.html',
  styleUrl: './data-bom.component.scss'
})
export class DataBomComponent extends BaseComponent implements OnInit {
  boMForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  itemTypeCode: string = ""
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private boMService:BoMService) {
    super(spinner)
  }
  async ngOnInit(): Promise<void> {
    this.boMForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      position: new FormControl(null),
      length: new FormControl(null),
      outputSeparator: new FormControl(null)
    });
    

    this.boMService.selectedData$.subscribe(result=>{
      if(!!result){
        delete result.itemType
        this.boMForm.setValue(result);

      }else{
        this.boMForm.reset();
      }
    });

    this.boMFormGroupValue.emit(this.boMForm);
    this.boMForm.valueChanges.subscribe(value => {
      if(value)
        this.boMFormGroupValue.emit(this.boMForm);
    });

    this.boMService.keepLeft$.subscribe(value => {
      this.keepLeft=value
    });
    this.boMService.keepRight$.subscribe(value => {
      this.keepRight=value
    })
  }

  @Output() boMFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.boMService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.boMService.keepRight.next(this.keepRight);
    this.boMService.selectedData.next(null);
  }
}
