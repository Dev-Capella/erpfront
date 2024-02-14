import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CurrencyService } from '../../service/currency.service';
import { BaseComponent } from '../../../../core/components/base/base.component';

@Component({
  selector: 'app-main-currency',
  templateUrl: './main-currency.component.html',
  styleUrl: './main-currency.component.scss'
})
export class MainCurrencyComponent extends BaseComponent implements OnInit {
  currencyList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private currencyService: CurrencyService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getCurrencyList();
  }

  async getCurrencyList() {
    this.showSpinner();
    this.currencyList = await this.currencyService.getCurrencies(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/currency-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-currency',
      header: 'Transaction Confirmation',
      message: 'The currency is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.currencyService.deleteCurrencyByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Currency has been removed successfully.'});
        await this.getCurrencyList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/currency-list/new'])
  }
}
