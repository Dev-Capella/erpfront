import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ItemSubCodeCheckTypeService } from '../../services/item-sub-code-check-type.service';
import { BaseComponent } from '../../../../core/components/base/base.component';

@Component({
  selector: 'app-main-item-sub-code-check-type',
  templateUrl: './main-item-sub-code-check-type.component.html',
  styleUrl: './main-item-sub-code-check-type.component.scss'
})
export class MainItemSubCodeCheckTypeComponent extends BaseComponent implements OnInit {
  itemSubCodeCheckTypeList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private itemSubCodeCheckTypeService: ItemSubCodeCheckTypeService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getItemSubCodeCheckTypeList();
  }

  async getItemSubCodeCheckTypeList() {
    this.showSpinner();
    this.itemSubCodeCheckTypeList = await this.itemSubCodeCheckTypeService.getItemSubCodeCheckTypes(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/item-sub-code-check-type-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-item-sub-code-check-type',
      header: 'Transaction Confirmation',
      message: 'The item sub code check type is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.itemSubCodeCheckTypeService.deleteItemSubCodeCheckTypeByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Item sub code check type has been removed successfully.'});
        await this.getItemSubCodeCheckTypeList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/item-sub-code-check-type-list/new'])
  }
}
