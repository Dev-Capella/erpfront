import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderPartnerService } from '../../services/order-partner.service';
import { OrderPartnerType } from '../../../../shared/enums/order-partner.enum';

@Component({
  selector: 'app-new-order-partner',
  templateUrl: './new-order-partner.component.html',
  styleUrl: './new-order-partner.component.scss'
})
export class NewOrderPartnerComponent extends BaseComponent implements OnInit {
  orderPartnerForm: FormGroup;
  orderPartnerTypes: any[] = [
    { code: 'CUSTOMER', name: 'Customer' },
    { code: 'SUPPLIER', name: 'Supplier' },
    { code: 'INTERNAL', name: 'Internal' }
  ]
  selectedOrderType: any;
  items: MenuItem[] = [
    {
      label: 'Back to List',
      icon: 'pi pi-arrow-left',
      styleClass: 'justify-content-center',
      command: () => {
        this.router.navigate(['/area-list'])
      }
    },
    {
      label: 'Save',
      icon: 'pi pi-save',
      styleClass: 'ml-auto',
      command: () => {
        this.save(this.orderPartnerForm.value, false)
      }
    },
    {
      label: 'Save And Close',
      icon: 'pi pi-replay',
      command: () => {
        this.save(this.orderPartnerForm.value, true);
      }
    },
  ];
  customerVisible: boolean = false;
  supplierVisible: boolean = false;
  internalVisible: boolean = false;
  constructor(spinner: NgxSpinnerService,
    private orderPartnerService: OrderPartnerService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {

    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Order Partner List',
        routerLink: ['/order-partner-list']
      },
      {
        label: 'New',
        routerLink: ['/order-partner-list/new']
      }
    ])
  }
  async ngOnInit(): Promise<void> {
    this.orderPartnerForm = this.formBuilder.group({
      currency: new FormControl(null),
    });

  }

  get formControls() {
    return this.orderPartnerForm.controls;
  }

  changeOrderPartnerType(event) {
    this.internalVisible = false;
    this.supplierVisible = false;
    this.customerVisible = false;
    switch (event) {
      case OrderPartnerType.CUSTOMER:
        this.customerVisible = true;
        break;
      case OrderPartnerType.SUPPLIER:
        this.supplierVisible = true;
        break;
      case OrderPartnerType.INTERNAL:
        this.internalVisible = true;
        break;
    }
  }

  save(value, close: boolean) {
    if (this.orderPartnerForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-order-partner',
      header: 'Transaction Confirmation',
      message: 'The order partner is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        var result = await this.orderPartnerService.saveOrderPartner(request, () => this.hideSpinner());
        close ? this.router.navigate(['/order-partner-list/']) : this.router.navigate(['/order-partner-list/' + result.code])
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Order partner has been saved successfully.' });
      }
    });
  }
}
