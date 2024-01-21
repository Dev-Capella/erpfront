import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { ManufacturerService } from '../../services/manufacturer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-manufacturer',
  templateUrl: './main-manufacturer.component.html',
  styleUrl: './main-manufacturer.component.scss'
})
export class MainManufacturerComponent extends BaseComponent implements OnInit {
  manufacturerList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private manufacturerService: ManufacturerService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getManufacturerList();
  }

  async getManufacturerList() {
    this.showSpinner();
    this.manufacturerList = await this.manufacturerService.getManufacturers(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/manufacturer-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-manufacturer',
      header: 'Transaction Confirmation',
      message: 'The manufacturer is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.manufacturerService.deleteManufacturerByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Manufacturer has been removed successfully.'});
        await this.getManufacturerList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/manufacturer-list/new'])
  }


}
