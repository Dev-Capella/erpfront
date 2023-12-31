import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-data-routing',
  templateUrl: './data-routing.component.html',
  styleUrl: './data-routing.component.scss'
})
export class DataRoutingComponent extends BaseComponent implements OnInit {
  routingForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  itemTypeCode: string = ""
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private routingService:RoutingService) {
    super(spinner)
  }
  async ngOnInit(): Promise<void> {
    this.routingForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      position: new FormControl(null),
      length: new FormControl(null),
      outputSeparator: new FormControl(null)
    });
    

    this.routingService.selectedData$.subscribe(result=>{
      if(!!result){
        delete result.itemType
        this.routingForm.setValue(result);

      }else{
        this.routingForm.reset();
      }
    });

    this.routingFormGroupValue.emit(this.routingForm);
    this.routingForm.valueChanges.subscribe(value => {
      if(value)
        this.routingFormGroupValue.emit(this.routingForm);
    });

    this.routingService.keepLeft$.subscribe(value => {
      this.keepLeft=value
    });
    this.routingService.keepRight$.subscribe(value => {
      this.keepRight=value
    })
  }

  @Output() routingFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.routingService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.routingService.keepRight.next(this.keepRight);
    this.routingService.selectedData.next(null);
  }
}
