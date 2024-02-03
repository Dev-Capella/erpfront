import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrl: './main-user.component.scss'
})
export class MainUserComponent extends BaseComponent implements OnInit {
  userList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getUserList();
  }

  async getUserList() {
    this.showSpinner();
    this.userList = await this.userService.getUsers(() => this.hideSpinner());
  }

  async edit() {
    var username = this.selectedItem?.username;
    this.router.navigate(['/user-list/',username])
  }

  async delete() {
    var username = this.selectedItem?.username;
    this.confirmationService.confirm({
      key: 'delete-user',
      header: 'Transaction Confirmation',
      message: 'The user is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.userService.deleteUserByUsername(username,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'User has been removed successfully.'});
        await this.getUserList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/user-list/new'])
  }

}
