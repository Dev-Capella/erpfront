import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CompositionService } from '../services/composition.service';
import { CompositionDetailService } from '../services/composition-detail.service';
import { ActivatedRoute } from '@angular/router';
import { CompositionComponentService } from '../../composition-component/services/composition-component.service';

@Component({
  selector: 'app-composition-details',
  templateUrl: './composition-details.component.html',
  styleUrl: './composition-details.component.scss'
})
export class CompositionDetailsComponent extends BaseComponent implements OnInit {
  compositionDetailList: any[] = []
  compositionComponentList: any[] = []
  code: string;
  compositionDetailDataDialog: boolean = false;
  compositionDetailForm: FormGroup;
  selectedItem: any;

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
  constructor(spinner: NgxSpinnerService,
    private compositionDetailService: CompositionDetailService,
    private messageService: MessageService,
    private compositionService: CompositionService,
    private compositionComponentService: CompositionComponentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
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
    await this.getCompositionComponentList();
    await this.getCompositionDetailList();
  }

  async getCompositionDetailList(){
    this.showSpinner();
    this.compositionDetailList = await this.compositionService.getCompositionDetailsByComposition(this.code,()=> this.hideSpinner());
  }

  async getCompositionComponentList(){
    this.showSpinner();
    this.compositionComponentList = await this.compositionComponentService.getCompositionComponents(()=> this.hideSpinner());
  }

  new(){
    this.compositionDetailForm.reset();
    this.compositionDetailDataDialog = true;
  }

  async onSubmit(value){
    var request = {
      id: value?.id,
      code: value?.code,
      shortText: value?.shortText,
      longText: value?.longText,
      searchText: value?.searchText,
      subComposition: value?.subComposition,
      useType: value?.useType,
      compositionComponent: {code: value?.compositionComponent?.code },
      sequenceNumber: value?.sequenceNumber,
      percentage: value?.percentage,
      composition: {code: this.code }
    }
    this.showSpinner();
    await this.compositionDetailService.saveCompositionDetail(request,()=> this.hideSpinner());
    this.compositionDetailDataDialog = false;
    this.compositionDetailForm.reset();
    await this.getCompositionDetailList();
    this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Composition detail has been saved successfully.'});
  }

  async edit(){
    this.compositionDetailForm.reset();
    var code = this.selectedItem?.code;
    var result = await this.compositionDetailService.getCompositionDetailByCode(code,()=> this.hideSpinner());
    this.compositionDetailForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText: result?.searchText,
      subComposition: result?.subComposition,
      useType: result?.useType,
      sequenceNumber: result?.sequenceNumber,
      percentage: result?.percentage,
      compositionComponent: result.compositionComponent ? this.compositionComponentList.filter(x=> x.code==result.compositionComponent.code)[0] : null
    })
    this.compositionDetailDataDialog = true;
  }

  async delete(){
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-composition-detail',
      header: 'Transaction Confirmation',
      message: 'The composition detail is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.compositionDetailService.deleteCompositionDetailByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Composition detail has been removed successfully.'});
        if(this.compositionDetailDataDialog)
          this.compositionDetailDataDialog = false;
        await this.getCompositionDetailList();
      }
  });
  }
}
