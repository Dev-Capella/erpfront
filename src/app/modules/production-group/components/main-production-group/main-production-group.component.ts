import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProductionGroupService } from '../../services/production-group.service';
import { BaseComponent } from '../../../../core/components/base/base.component';

@Component({
  selector: 'app-main-production-group',
  templateUrl: './main-production-group.component.html',
  styleUrl: './main-production-group.component.scss'
})
export class MainProductionGroupComponent extends BaseComponent implements OnInit {
  productionGroupList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private productionGroupService: ProductionGroupService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getProductionGroupList();
  }

  async getProductionGroupList() {
    this.showSpinner();
    this.productionGroupList = await this.productionGroupService.getProductionGroups(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/production-group-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-production-group',
      header: 'Transaction Confirmation',
      message: 'The production group is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.productionGroupService.deleteProductionGroupByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Production group has been removed successfully.'});
        await this.getProductionGroupList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/production-group-list/new'])
  }
}
