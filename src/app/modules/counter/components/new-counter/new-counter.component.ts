import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { CounterService } from '../../services/counter.service';
import { CounterTypeService } from '../../../counter-type/services/counter-type.service';

@Component({
  selector: 'app-new-counter',
  templateUrl: './new-counter.component.html',
  styleUrl: './new-counter.component.scss'
})
export class NewCounterComponent extends BaseComponent implements OnInit {
  counterForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  subSeriesTypeList: any[] = [
    { code: 'YEAR', name: 'Year' },
    { code: 'ITEM_TYPE', name: 'Item type' },
  ]
  updateCriteriaList: any[] = [
    { code: 'NA', name: 'N/A' },
    { code: 'ALWAYS', name: 'Always' },
    { code: 'YES_IF_IT_IS_THE_NEXT_VALUE', name: 'Yes, if it is the next value' },
    { code: 'NEVER', name: 'Never' },
  ]
  counterTypes: any[] = []
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private counterService: CounterService,
    private counterTypeService: CounterTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);

  }
  async ngOnInit(): Promise<void> {
    this.counterForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      provisionalCounter: new FormControl(false),
      defaultCounter: new FormControl(false),
      counterType: new FormControl(null),
      subSeriesRequired: new FormControl(false),
      subSeriesType: new FormControl(null),
      beginLimit: new FormControl(null),
      finalLimit: new FormControl(null),
      step: new FormControl(null),
      mask: new FormControl(null),
      outputSeparator: new FormControl(null),
      counterWidth: new FormControl(null),
      subSeriesWidth: new FormControl(null),
      prefix: new FormControl(null),
      suffix: new FormControl(null),
      counterReset: new FormControl(false),
      updateCriteria: new FormControl(null),
    });
    await this.getCounterTypes();
  }

  get formControls() {
    return this.counterForm.controls;
  }

  async getCounterTypes() {
    this.showSpinner();
    this.counterTypes = await this.counterTypeService.getCounterTypes(() => this.hideSpinner());
  }

  save(value) {
    if (this.counterForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-counter',
      header: 'Transaction Confirmation',
      message: 'The counter is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          shortText: value?.shortText,
          longText: value?.longText,
          searchText: value?.searchText,
          provisionalCounter: value?.provisionalCounter,
          defaultCounter: value?.defaultCounter,
          counterType: value.counterType!=null ? {code: value?.counterType.code } : null,
          subSeriesRequired: value?.subSeriesRequired,
          subSeriesType: value?.subSeriesType,
          beginLimit: value?.beginLimit,
          finalLimit: value?.finalLimit,
          step: value?.step,
          mask: value?.mask,
          outputSeparator: value?.outputSeparator,
          counterWidth: value?.counterWidth,
          subSeriesWidth: value?.subSeriesWidth,
          prefix: value?.prefix,
          suffix: value?.suffix,
          counterReset: value?.counterReset,
          updateCriteria: value?.updateCriteria,
        }
        this.showSpinner();
        await this.counterService.saveCounter(request, () => this.hideSpinner());
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Counter has been saved successfully.' });
        this.router.navigate(['/counter-list'])
      }
    });

  }

  goBack() {
    this.router.navigate(['/counter-list'])
  }
}
