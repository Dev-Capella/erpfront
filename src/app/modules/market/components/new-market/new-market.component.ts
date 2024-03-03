import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-new-market',
  templateUrl: './new-market.component.html',
  styleUrl: './new-market.component.scss'
})
export class NewMarketComponent extends BaseComponent implements OnInit{
  marketForm: FormGroup;
  items: MenuItem[] = [
    {
      label: 'Back to List',
      icon: 'pi pi-arrow-left',
      styleClass: 'justify-content-center',
      command: () => {
        this.router.navigate(['/market-list'])
      }
    },
    {
      label: 'Save',
      icon: 'pi pi-save',
      styleClass: 'ml-auto',
      command: () => {
        this.save(this.marketForm.value, false)
      }
    },
    {
      label: 'Save And Close',
      icon: 'pi pi-replay',
      command: () => {
        this.save(this.marketForm.value, true);
      }
    },
  ];
  constructor(spinner: NgxSpinnerService,
    private marketService: MarketService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {

    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Market List',
        routerLink: ['/market-list']
      },
      {
        label: 'New',
        routerLink: ['/market-list/new']
      }
    ])
  }
  async ngOnInit(): Promise<void> {
    this.marketForm = this.formBuilder.group({
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });

  }

  get formControls() {
    return this.marketForm.controls;
  }

  save(value, close: boolean) {
    if (this.marketForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-market',
      header: 'Transaction Confirmation',
      message: 'The market is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        var result = await this.marketService.saveMarket(request, () => this.hideSpinner());
        close ? this.router.navigate(['/market-list/']) : this.router.navigate(['/market-list/' + result.code])
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Market has been saved successfully.' });
      }
    });
  }
}
