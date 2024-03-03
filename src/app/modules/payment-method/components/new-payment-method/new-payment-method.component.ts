import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PaymentMethodService } from '../../services/payment-method.service';

@Component({
  selector: 'app-new-payment-method',
  templateUrl: './new-payment-method.component.html',
  styleUrl: './new-payment-method.component.scss'
})
export class NewPaymentMethodComponent extends BaseComponent implements OnInit{
  paymentMethodForm: FormGroup;
  items: MenuItem[] = [
    {
      label: 'Back to List',
      icon: 'pi pi-arrow-left',
      styleClass: 'justify-content-center',
      command: () => {
        this.router.navigate(['/payment-method-list'])
      }
    },
    {
      label: 'Save',
      icon: 'pi pi-save',
      styleClass: 'ml-auto',
      command: () => {
        this.save(this.paymentMethodForm.value, false)
      }
    },
    {
      label: 'Save And Close',
      icon: 'pi pi-replay',
      command: () => {
        this.save(this.paymentMethodForm.value, true);
      }
    },
  ];
  constructor(spinner: NgxSpinnerService,
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {

    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Payment Method List',
        routerLink: ['/payment-method-list']
      },
      {
        label: 'New',
        routerLink: ['/payment-method-list/new']
      }
    ])
  }
  async ngOnInit(): Promise<void> {
    this.paymentMethodForm = this.formBuilder.group({
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      paymentWithBills:new FormControl(false),
    });

  }

  get formControls() {
    return this.paymentMethodForm.controls;
  }

  save(value, close: boolean) {
    if (this.paymentMethodForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-payment-method',
      header: 'Transaction Confirmation',
      message: 'The payment method is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          paymentWithBills: value?.paymentWithBills,
        }
        this.showSpinner();
        var result = await this.paymentMethodService.savePaymentMethod(request, () => this.hideSpinner());
        close ? this.router.navigate(['/payment-method-list/']) : this.router.navigate(['/payment-method-list/' + result.code])
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Payment method has been saved successfully.' });
      }
    });
  }
}
