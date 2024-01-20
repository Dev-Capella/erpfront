import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemTypeService } from '../../services/item-type.service';
import { FunctionsMenuItemActions } from '../../../../shared/enums/functions-menu-item-actions.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-item-type',
  templateUrl: './main-item-type.component.html',
  styleUrl: './main-item-type.component.scss'
})
export class MainItemTypeComponent extends BaseComponent implements OnInit {
  itemTypeList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private itemTypeService: ItemTypeService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getItemTypes();
  }

  async getItemTypes() {
    this.showSpinner();
    this.itemTypeList = await this.itemTypeService.getItemTypes(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/item-type-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-item-type',
      header: 'Transaction Confirmation',
      message: 'The item type is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.itemTypeService.deleteItemTypeByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Item type has been removed successfully.'});
        await this.getItemTypes();
      }
  });
   
  }

  new() {
    this.router.navigate(['/item-type-list/new'])
  }
}
