import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { PermissionService } from '../../services/permission.service';
@Component({
  selector: 'app-main-permission',
  templateUrl: './main-permission.component.html',
  styleUrl: './main-permission.component.scss'
})
export class MainPermissionComponent extends BaseComponent implements OnInit {
  permissionList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private permissionService: PermissionService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getPermissionList();
  }

  async getPermissionList() {
    this.showSpinner();
    this.permissionList = await this.permissionService.getPermissions(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/permission-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-permission',
      header: 'Transaction Confirmation',
      message: 'The permission is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.permissionService.deletePermissionByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Permission has been removed successfully.'});
        await this.getPermissionList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/permission-list/new'])
  }
}
