import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { CounterTypeService } from '../../services/counter-type.service';

@Component({
  selector: 'app-new-counter-type',
  templateUrl: './new-counter-type.component.html',
  styleUrl: './new-counter-type.component.scss'
})
export class NewCounterTypeComponent extends BaseComponent implements OnInit {
  counterTypeForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  subSeriesTypeRequiredList: any[] = [
    { code: 'NO', name: 'No' },
    { code: 'ALL', name: 'All' },
    { code: 'YEAR', name: 'Year' },
    { code: 'ITEM_TYPE', name: 'Item type' },
  ]
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private counterTypeService: CounterTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);

  }
  ngOnInit(): void {
    this.counterTypeForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      provisionalCounterAllowed: new FormControl(false),
      defaultCounterAllowed: new FormControl(false),
      counterTypeLength: new FormControl(null),
      subSeriesTypeRequired: new FormControl(null)
    });
  }

  get formControls() {
    return this.counterTypeForm.controls;
  }

  save(value) {
    if (this.counterTypeForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-counter-type',
      header: 'Transaction Confirmation',
      message: 'The counter type is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          provisionalCounterAllowed:  value?.provisionalCounterAllowed,
          defaultCounterAllowed:  value?.defaultCounterAllowed,
          counterTypeLength:  value?.counterTypeLength,
          subSeriesTypeRequired:  value?.subSeriesTypeRequired
        }
        this.showSpinner();
        await this.counterTypeService.saveCounterType(request, () => this.hideSpinner());
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Counter type has been saved successfully.' });
        this.router.navigate(['/counter-type-list'])
      }
    });

  }

  goBack() {
    this.router.navigate(['/counter-type-list'])
  }
}
