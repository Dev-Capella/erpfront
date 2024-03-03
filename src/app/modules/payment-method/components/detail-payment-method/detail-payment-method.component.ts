import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PaymentMethodService } from '../../services/payment-method.service';

@Component({
  selector: 'app-detail-payment-method',
  templateUrl: './detail-payment-method.component.html',
  styleUrl: './detail-payment-method.component.scss'
})
export class DetailPaymentMethodComponent extends BaseComponent implements OnInit{
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
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {
        this.delete();
      }
    },
  ];
  code: string;
  constructor(spinner: NgxSpinnerService,
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
    
  }
  async ngOnInit(): Promise<void> {
    this.paymentMethodForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      paymentWithBills:new FormControl(false)
    });
    await this.getPaymentMethodByCode();
  }

  get formControls() {
    return this.paymentMethodForm.controls;
  }

  async getPaymentMethodByCode() {
    this.showSpinner();
    var result = await this.paymentMethodService.getPaymentMethodByCode(this.code, () => this.hideSpinner());
    this.paymentMethodForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText: result?.searchText,
      paymentWithBills: result?.paymentWithBills
    })
    this.breadcrumbService.setItems([
      {
        label: 'Payment Method List',
        routerLink: ['/payment-method-list']
      },
      {
        label: this.paymentMethodForm?.value?.shortText,
        routerLink: ['/payment-method-list/' + this.code]
      }
    ])
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
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          paymentWithBills: value?.paymentWithBills
        }
        this.showSpinner();
        var result = await this.paymentMethodService.savePaymentMethod(request, () => this.hideSpinner());
        close ? this.router.navigate(['/payment-method-list/']) : this.getPaymentMethodByCode();
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Area has been saved successfully.' });
      }
    });
  }

  async delete() {
    var code = this.code;
    this.confirmationService.confirm({
      key: 'delete-payment-method',
      header: 'Transaction Confirmation',
      message: 'The payment method is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.paymentMethodService.deletePaymentMethodByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Payment method has been removed successfully.'});
        this.router.navigate(['/payment-method-list/'])
      }
  });
}
}
