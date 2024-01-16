import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { UnitOfMeasureService } from '../../services/unit-of-measure.service';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-uom',
  templateUrl: './main-uom.component.html',
  styleUrl: './main-uom.component.scss',
})
export class MainUomComponent extends BaseComponent implements OnInit {
  activeItem: any;
  items: MenuItem[] = [{
    label: 'Options',
    items: [{
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        this.detail(this.activeItem);
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: async () => {
        await this.delete(this.activeItem);
      }
    }
    ]
  }
  ];


  unitOfMeasureList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private unitOfMeasureService: UnitOfMeasureService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }
  async ngOnInit(): Promise<void> {
    await this.getUnitOfMeasureList();
  }

  async getUnitOfMeasureList() {
    this.showSpinner();
    this.unitOfMeasureList = await this.unitOfMeasureService.getUnitOfMeasures(() => this.hideSpinner());
  }

  async detail(activeItem) {
    this.router.navigate(['/unit-of-measure-list/',activeItem.code])
  }

  async delete(activeItem) {
    this.confirmationService.confirm({
      key: 'delete-uom',
      header: 'Transaction Confirmation',
      message: 'The unit of measurement is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.unitOfMeasureService.deleteUnitOfMeasureByCode(activeItem.code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Unit of measure has been removed successfully.'});
        await this.getUnitOfMeasureList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/unit-of-measure-list/new'])
  }

  handleMenu(item){
    this.activeItem = item;
  }

}
