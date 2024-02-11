import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { ParameterService } from '../../services/parameter.service';
import { ParameterDataType } from '../../../../shared/enums/parameter-data-type.enum';

@Component({
  selector: 'app-detail-parameter',
  templateUrl: './detail-parameter.component.html',
  styleUrl: './detail-parameter.component.scss'
})
export class DetailParameterComponent extends BaseComponent implements OnInit {
  parameterForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  dataTypes: any[] = [
    {code: 'TEXT', name: 'TEXT'},
    {code: 'NUMERIC', name: 'NUMERIC'},
    {code: 'LOGIC', name: 'LOGIC'},
  ]
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private parameterService:ParameterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.parameterForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      dataType: new FormControl(null),
      textValue: new FormControl(null),
      numericValue: new FormControl(null),
      logicValue: new FormControl(null),
    });
    await this.getParameterByCode();
  }

  get formControls(){
    return this.parameterForm.controls;
  }

  changeDataType(event){
    if(event==ParameterDataType.LOGIC){
      this.parameterForm.get('numericValue').reset();
      this.parameterForm.get('numericValue').clearValidators();
      this.parameterForm.get('textValue').reset();
      this.parameterForm.get('textValue').clearValidators();
      this.parameterForm.get('logicValue').setValidators([Validators.required])

    }else if(event==ParameterDataType.NUMERIC){

      this.parameterForm.get('textValue').reset();
      this.parameterForm.get('textValue').clearValidators();
      this.parameterForm.get('logicValue').reset();
      this.parameterForm.get('logicValue').clearValidators();
      this.parameterForm.get('numericValue').setValidators([Validators.required])

    }else{

      this.parameterForm.get('numericValue').reset();
      this.parameterForm.get('numericValue').clearValidators();
      this.parameterForm.get('logicValue').reset();
      this.parameterForm.get('logicValue').clearValidators();
      this.parameterForm.get('textValue').setValidators([Validators.required])
    }

    this.parameterForm.get('textValue').updateValueAndValidity();
    this.parameterForm.get('numericValue').updateValueAndValidity();
    this.parameterForm.get('logicValue').updateValueAndValidity();

  }

  async getParameterByCode(){
    this.showSpinner();
    var result = await this.parameterService.getParameterByCode(this.code, ()=> this.hideSpinner());
    this.parameterForm.patchValue({
      id: result.id,
      code: result.code,
      longText: result.longText,
      shortText: result.shortText,
      searchText: result.searchText,
      dataType: result.dataType,
    })
    this.changeDataType(this.parameterForm.controls['dataType'].value);
    this.updateFormValue(result);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
  }

  updateFormValue(result): void {
    switch (result.dataType) {
      case ParameterDataType.LOGIC:
        this.parameterForm.patchValue({
          logicValue: result.value === 'true' ? true : false
        });
        break;
      case ParameterDataType.NUMERIC:
        this.parameterForm.patchValue({
          numericValue: Number(result.value)
        });
        break;
      default:
        this.parameterForm.patchValue({
          textValue: result.value
        });
        break;
    }
  }

  save(value){
    if(this.parameterForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-parameter',
      header: 'Transaction Confirmation',
      message: 'The permission is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          dataType: value?.dataType,
          value: this.assignValueBasedOnDataType(value?.dataType)
        }
        this.showSpinner();
        await this.parameterService.saveParameter(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Parameter has been saved successfully.'});
        this.router.navigate(['/parameter-list'])
      }
  });
   
  }

  assignValueBasedOnDataType(dataType): any {
    switch (dataType) {
        case ParameterDataType.TEXT:
            return this.parameterForm?.value?.textValue;
        case ParameterDataType.NUMERIC:
            return this.parameterForm?.value?.numericValue.toString();
        case ParameterDataType.LOGIC:
            return this.parameterForm?.value?.logicValue.toString();
        default:
            return null;
    }
}

  goBack(){
    this.router.navigate(['/parameter-list'])
  }
}
