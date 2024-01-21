import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserGenericGroupService } from '../../services/user-generic-group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-user-generic-group',
  templateUrl: './main-user-generic-group.component.html',
  styleUrl: './main-user-generic-group.component.scss'
})
export class MainUserGenericGroupComponent extends BaseComponent implements OnInit {
  userGenericGroupList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private userGenericGroupService: UserGenericGroupService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getUserGenericGroupList();
  }

  async getUserGenericGroupList() {
    this.showSpinner();
    this.userGenericGroupList = await this.userGenericGroupService.getUserGenericGroups(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/user-generic-group-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-user-generic-group',
      header: 'Transaction Confirmation',
      message: 'The user generic group is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.userGenericGroupService.deleteUserGenericGroupByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'User generic group has been removed successfully.'});
        await this.getUserGenericGroupList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/user-generic-group-list/new'])
  }
}
