import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AreaService } from '../../services/area.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-new-area',
  templateUrl: './new-area.component.html',
  styleUrl: './new-area.component.scss'
})
export class NewAreaComponent extends BaseComponent implements OnInit {
  items: MenuItem[];

  constructor(spinner: NgxSpinnerService,
    private areaService: AreaService,
    private router: Router,
    private breadcrumbService: BreadcrumbService) {

    super(spinner);
    this.breadcrumbService.setItems([
      // {
      //   label: 'Home',
      //   routerLink: ['/']
      // },
      {
        label: 'Area List',
        routerLink: ['/area-list']
      },
      {
        label: 'New',
        routerLink: ['/area-list/new']
      }
    ])
  }
  async ngOnInit(): Promise<void> {
    this.items = [
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
          this.router.navigate(['/area-list'])
        }
      },
      {
        label: 'Save And Close',
        icon: 'pi pi-replay',
        command: () => {
          this.router.navigate(['/area-list'])
        }
      },
    ];
  }
}
