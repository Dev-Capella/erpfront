import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MarketService } from '../../services/market.service';
@Component({
  selector: 'app-detail-market',
  templateUrl: './detail-market.component.html',
  styleUrl: './detail-market.component.scss'
})
export class DetailMarketComponent extends BaseComponent implements OnInit{
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
    private marketService: MarketService,
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
    this.marketForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
    await this.getMarketByCode();
  }

  get formControls() {
    return this.marketForm.controls;
  }

  async getMarketByCode() {
    this.showSpinner();
    var result = await this.marketService.getMarketByCode(this.code, () => this.hideSpinner());
    this.marketForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText: result?.searchText
    })
    this.breadcrumbService.setItems([
      {
        label: 'Area List',
        routerLink: ['/market-list']
      },
      {
        label: this.marketForm?.value?.shortText,
        routerLink: ['/market-list/' + this.code]
      }
    ])
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
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        var result = await this.marketService.saveMarket(request, () => this.hideSpinner());
        close ? this.router.navigate(['/market-list/']) : this.getMarketByCode();
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Market has been saved successfully.' });
      }
    });
  }

  async delete() {
    var code = this.code;
    this.confirmationService.confirm({
      key: 'delete-market',
      header: 'Transaction Confirmation',
      message: 'The market is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.marketService.deleteMarketByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Market has been removed successfully.'});
        this.router.navigate(['/market-list/'])
      }
  });
}
}
