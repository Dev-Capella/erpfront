import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CurrencyService } from '../../service/currency.service';
import { BaseComponent } from '../../../../core/components/base/base.component';

@Component({
  selector: 'app-new-currency',
  templateUrl: './new-currency.component.html',
  styleUrl: './new-currency.component.scss'
})
export class NewCurrencyComponent extends BaseComponent implements OnInit {
  currencyForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  roundingCriteriaTypes: any[] = [
    { code: 'RAISE', name: 'Raise' },
    { code: 'ROUND', name: 'Round' },
    { code: 'TRUNCATE', name: 'Truncate' }
  ]
  numbers: any[] = [
    { code: 0, name: 0 },
    { code: 1, name: 1 },
    { code: 2, name: 2 },
    { code: 3, name: 3 },
    { code: 4, name: 4 },
    { code: 5, name: 5 },
    { code: 6, name: 6 },
    { code: 7, name: 7 },
    { code: 8, name: 8 },
    { code: 9, name: 9 },
  ]
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);

  }
  ngOnInit(): void {
    this.currencyForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      roundingCriteriaType: new FormControl(null),
      numberOfDecimal: new FormControl(null),
      divisorForExchangeRate: new FormControl(null),
      taxRoundingCriteriaType: new FormControl(null),
      taxNumberOfDecimal: new FormControl(null)
    });
  }

  get formControls() {
    return this.currencyForm.controls;
  }

  save(value) {
    if (this.currencyForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-currency',
      header: 'Transaction Confirmation',
      message: 'The currency is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          code: value?.code,
          shortText: value?.shortText,
          longText: value?.longText,
          searchText: value?.searchText,
          roundingCriteriaType: value?.roundingCriteriaType,
          numberOfDecimal: value?.numberOfDecimal,
          divisorForExchangeRate: value?.divisorForExchangeRate,
          taxRoundingCriteriaType: value?.taxRoundingCriteriaType,
          taxNumberOfDecimal: value?.taxNumberOfDecimal
        }
        this.showSpinner();
        await this.currencyService.saveCurrency(request, () => this.hideSpinner());
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Currency has been saved successfully.' });
        this.router.navigate(['/currency-list'])
      }
    });

  }

  goBack() {
    this.router.navigate(['/currency-list'])
  }
}
