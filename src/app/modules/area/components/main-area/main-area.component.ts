import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AreaService } from '../../services/area.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-main-area',
  templateUrl: './main-area.component.html',
  styleUrl: './main-area.component.scss'
})
export class MainAreaComponent extends BaseComponent implements OnInit {

  items: MenuItem[];
  areaList: any[] = []
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
    private areaService: AreaService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Area List',
        routerLink: ['/area-list']
      }
    ])

  }
  async ngOnInit(): Promise<void> {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/area-list/new'])
        }
      },
    ];
    await this.getAreaList();
  }


  async getAreaList() {
    this.showSpinner();
    this.areaList = await this.areaService.getAreas(() => this.hideSpinner());
  }

  onRowDblClick(item){
    this.router.navigate(['/area-list/' + item.code]);
  }


  detail(){
    this.router.navigate(['/area-list/' + this.selectedItem.code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-area',
      header: 'Transaction Confirmation',
      message: 'The area is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.areaService.deleteAreaByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Area has been removed successfully.'});
        await this.getAreaList();
      }
  });
   
  }

}
