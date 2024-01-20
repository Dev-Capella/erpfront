import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostLevelService } from '../services/cost-level.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-cost-level',
  templateUrl: './main-cost-level.component.html',
  styleUrl: './main-cost-level.component.scss'
})
export class MainCostLevelComponent extends BaseComponent implements OnInit {
  costLevelList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private costLevelService: CostLevelService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getCostLevelList();
  }

  async getCostLevelList() {
    this.showSpinner();
    this.costLevelList = await this.costLevelService.getCostLevels(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/cost-level-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-cost-level',
      header: 'Transaction Confirmation',
      message: 'The cost level is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.costLevelService.deleteCostLevelByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Cost level has been removed successfully.'});
        await this.getCostLevelList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/cost-level-list/new'])
  }


}
