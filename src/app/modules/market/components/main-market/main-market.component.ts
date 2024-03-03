import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-main-market',
  templateUrl: './main-market.component.html',
  styleUrl: './main-market.component.scss'
})
export class MainMarketComponent extends BaseComponent implements OnInit {

  items: MenuItem[];
  marketList: any[] = []
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
    private marketService: MarketService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Market List',
        routerLink: ['/market-list']
      }
    ])

  }
  async ngOnInit(): Promise<void> {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/market-list/new'])
        }
      },
    ];
    await this.getMarketList();
  }


  async getMarketList() {
    this.showSpinner();
    this.marketList = await this.marketService.getMarkets(() => this.hideSpinner());
  }

  onRowDblClick(item){
    this.router.navigate(['/market-list/' + item.code]);
  }


  detail(){
    this.router.navigate(['/market-list/' + this.selectedItem.code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-market',
      header: 'Transaction Confirmation',
      message: 'The market is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.marketService.deleteMarketByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Market has been removed successfully.'});
        await this.getMarketList();
      }
  });
   
  }
}
