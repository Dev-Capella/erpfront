import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { PaymentMethodService } from '../../services/payment-method.service';

@Component({
  selector: 'app-main-payment-method',
  templateUrl: './main-payment-method.component.html',
  styleUrl: './main-payment-method.component.scss'
})
export class MainPaymentMethodComponent extends BaseComponent implements OnInit{

  items: MenuItem[];
  paymentMethodList: any[] = []
  public selectedItem: any;

  actions: any[] = [{
   label: 'Actions',
   items: [{
        label: 'Detail',
        icon: 'pi pi-refresh',
        command: () => {
            this.detail();
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
            this.delete();
        }
    }
    ]},
];
  constructor(spinner: NgxSpinnerService,
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Payment Method List',
        routerLink: ['/payment-method-list']
      }
    ])

  }
  async ngOnInit(): Promise<void> {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/payment-method-list/new'])
        }
      },
    ];
    await this.getPaymentMethodList();
  }


  async getPaymentMethodList() {
    this.showSpinner();
    this.paymentMethodList = await this.paymentMethodService.getPaymentMethods(() => this.hideSpinner());
  }

  onRowDblClick(item){
    this.router.navigate(['/payment-method-list/' + item.code]);
  }


  detail(){
    this.router.navigate(['/payment-method-list/' + this.selectedItem.code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-payment-method',
      header: 'Transaction Confirmation',
      message: 'The payment method is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.paymentMethodService.deletePaymentMethodByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Payment method has been removed successfully.'});
        await this.getPaymentMethodList();
      }
  });
   
  }

}
