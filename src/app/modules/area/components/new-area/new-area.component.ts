import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AreaService } from '../../services/area.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-area',
  templateUrl: './new-area.component.html',
  styleUrl: './new-area.component.scss'
})
export class NewAreaComponent extends BaseComponent implements OnInit {
  items: MenuItem[];

  constructor(spinner: NgxSpinnerService,
    private areaService: AreaService,
    private router: Router) {
    super(spinner);

  }
  async ngOnInit(): Promise<void> {
    this.items = [
      {
        label: 'Back to List',
        icon: 'pi pi-arrow-left',
        command: () => {
          this.router.navigate(['/area-list'])
        }
      },
    ];
  }
}
