import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'app-main-user-role',
  templateUrl: './main-user-role.component.html',
  styleUrl: './main-user-role.component.scss'
})
export class MainUserRoleComponent extends BaseComponent implements OnInit  {
  userRoleList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private userRoleService: UserRoleService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getUserRoleList();
  }

  async getUserRoleList() {
    this.showSpinner();
    this.userRoleList = await this.userRoleService.getUserRoles(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/user-role-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-user-role',
      header: 'Transaction Confirmation',
      message: 'The user role is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.userRoleService.deleteUserRoleByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'User role has been removed successfully.'});
        await this.getUserRoleList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/user-role-list/new'])
  }
}
