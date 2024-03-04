import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { TransportZoneService } from '../../services/transport-zone.service';

@Component({
  selector: 'app-main-transport-zone',
  templateUrl: './main-transport-zone.component.html',
  styleUrl: './main-transport-zone.component.scss'
})
export class MainTransportZoneComponent extends BaseComponent implements OnInit{
  items: MenuItem[];
  transportZoneList: any[] = []
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
    private transportZoneService: TransportZoneService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Transport Zone List',
        routerLink: ['/transport-zone-list']
      }
    ])

  }
  async ngOnInit(): Promise<void> {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/transport-zone-list/new'])
        }
      },
    ];
    await this.getTransportZoneList();
  }


  async getTransportZoneList() {
    this.showSpinner();
    this.transportZoneList = await this.transportZoneService.getTransportZones(() => this.hideSpinner());
  }

  onRowDblClick(item){
    this.router.navigate(['/transport-zone-list/' + item.code]);
  }


  detail(){
    this.router.navigate(['/transport-zone-list/' + this.selectedItem.code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-transport-zone',
      header: 'Transaction Confirmation',
      message: 'The transport zone is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.transportZoneService.deleteTransportZoneByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Transport zone has been removed successfully.'});
        await this.getTransportZoneList();
      }
  });
   
  }

}
