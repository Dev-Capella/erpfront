import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-main-country',
  templateUrl: './main-country.component.html',
  styleUrl: './main-country.component.scss'
})
export class MainCountryComponent extends BaseComponent implements OnInit{

  items: MenuItem[];
  countryList: any[] = []
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
    private countryService: CountryService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Country List',
        routerLink: ['/country-list']
      }
    ])

  }
  async ngOnInit(): Promise<void> {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/country-list/new'])
        }
      },
    ];
    await this.getCountryList();
  }


  async getCountryList() {
    this.showSpinner();
    this.countryList = await this.countryService.getCountries(() => this.hideSpinner());
  }

  onRowDblClick(item){
    this.router.navigate(['/country-list/' + item.code]);
  }


  detail(){
    this.router.navigate(['/country-list/' + this.selectedItem.code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-country',
      header: 'Transaction Confirmation',
      message: 'The country is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.countryService.deleteCountryByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Country has been removed successfully.'});
        await this.getCountryList();
      }
  });
   
  }

}
