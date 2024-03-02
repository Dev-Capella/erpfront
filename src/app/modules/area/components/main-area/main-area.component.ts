import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AreaService } from '../../services/area.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-area',
  templateUrl: './main-area.component.html',
  styleUrl: './main-area.component.scss'
})
export class MainAreaComponent extends BaseComponent implements OnInit {

  items: MenuItem[];
  areaList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private areaService: AreaService,
    private router: Router) {
    super(spinner);

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

}
