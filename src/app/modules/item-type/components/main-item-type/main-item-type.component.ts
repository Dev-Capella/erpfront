import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemTypeService } from '../../services/item-type.service';
import { FunctionsMenuItemActions } from '../../../../shared/enums/functions-menu-item-actions.enum';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-main-item-type',
  templateUrl: './main-item-type.component.html',
  styleUrl: './main-item-type.component.scss'
})
export class MainItemTypeComponent extends BaseComponent implements OnInit {
  items: MenuItem[];
  itemTypeList: any[] = []
  selectedItem: any;
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
    private itemTypeService: ItemTypeService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Item Type List',
        routerLink: ['/item-type-list']
      }
    ])
  }

  async ngOnInit(): Promise<void> {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/item-type-list/new'])
        }
      },
    ];
    await this.getItemTypeList();
  }

  async getItemTypeList() {
    this.showSpinner();
    this.itemTypeList = await this.itemTypeService.getItemTypes(() => this.hideSpinner());
  }

  onRowDblClick(item){
    this.router.navigate(['/item-type-list/' + item.code]);
  }


  detail(){
    this.router.navigate(['/item-type-list/' + this.selectedItem.code])
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
        await this.getItemTypeList();
      }
  });
   
  }
}
