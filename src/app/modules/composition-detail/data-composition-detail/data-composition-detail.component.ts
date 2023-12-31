import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionDetailService } from '../services/composition-detail.service';
import { CompositionComponentService } from '../../composition-component/services/composition-component.service';

@Component({
  selector: 'app-data-composition-detail',
  templateUrl: './data-composition-detail.component.html',
  styleUrl: './data-composition-detail.component.scss'
})
export class DataCompositionDetailComponent extends BaseComponent implements OnInit {
  compositionDetailForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  compositionCode: string = ""

  subCompositionTypes: any[] = [
    {code: 'TYPE_1', name: 'Type 1'},
    {code: 'TYPE_2', name: 'Type 2'},
    {code: 'TYPE_3', name: 'Type 3'},
    {code: 'TYPE_4', name: 'Type 4'},
    {code: 'TYPE_5', name: 'Type 5'},
    {code: 'TYPE_6', name: 'Type 6'},
    {code: 'TYPE_7', name: 'Type 7'},
    {code: 'TYPE_8', name: 'Type 8'},
    {code: 'TYPE_9', name: 'Type 9'},
  ]

  useTypes: any[] = [
    {code: 'BOTH', name: 'Both'},
    {code: 'INTERNAL', name: 'Internal'},
    {code: 'EXTERNAL', name: 'External'},
  ]

  compositionComponentList: any[] = []
  @Output() compositionDetailFormGroupValue : EventEmitter<any> = new EventEmitter();
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private compositionDetailService:CompositionDetailService,
    private compositionComponentService: CompositionComponentService) {
    super(spinner)
  }
  async ngOnInit(): Promise<void> {
    this.compositionDetailForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      subComposition: new FormControl(null),
      useType: new FormControl(null),
      compositionComponent: new FormControl(null),
      sequenceNumber: new FormControl(null),
      percentage: new FormControl(null)
    });
    
    this.compositionDetailService.selectedData$.subscribe(result=>{
      if(!!result){
        delete result.composition
        this.compositionDetailForm.setValue(result);
        this.compositionDetailForm.patchValue({
          compositionComponent: result.compositionComponent ? this.compositionComponentList.filter(x=> x.code==result.compositionComponent.code)[0] : null
        })

      }else{
        this.compositionDetailForm.reset();
      }
    });

    this.compositionDetailFormGroupValue.emit(this.compositionDetailForm);
    this.compositionDetailForm.valueChanges.subscribe(value => {
      if(value)
        this.compositionDetailFormGroupValue.emit(this.compositionDetailForm);
    });

    this.compositionDetailService.keepLeft$.subscribe(value => {
      this.keepLeft=value
    });
    this.compositionDetailService.keepRight$.subscribe(value => {
      this.keepRight=value
    })
    await this.getCompositionComponentList();
  }

  async getCompositionComponentList(){
    this.showSpinner();
    this.compositionComponentList = await this.compositionComponentService.getCompositionComponents(()=> this.hideSpinner());
  }

  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.compositionDetailService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.compositionDetailService.keepRight.next(this.keepRight);
    this.compositionDetailService.selectedData.next(null);
  }
}
