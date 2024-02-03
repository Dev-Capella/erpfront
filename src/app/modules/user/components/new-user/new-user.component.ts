import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../user-role/services/user-role.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent extends BaseComponent implements OnInit {
  userForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  userRoles: any[] = []
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userService:UserService,
    private userRoleService: UserRoleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  async ngOnInit(): Promise<void> {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      username: new FormControl(null),
      definedPassword: new FormControl(null),
      email: new FormControl(null),
      phoneNumber: new FormControl(null),
      userRoles: new FormControl([])
    });
    await this.getUserRoles();
  }

  get formControls(){
    return this.userForm.controls;
  }

  async getUserRoles(){
    this.showSpinner();
    this.userRoles = await this.userRoleService.getUserRoles(()=> this.hideSpinner());
  }

  save(value){
    if(this.userForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-user',
      header: 'Transaction Confirmation',
      message: 'The user is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          firstName: value?.firstName,
          lastName: value?.lastName,
          username: value?.username,
          definedPassword: value?.definedPassword,
          email: value?.email,
          phoneNumber: value?.phoneNumber,
          userRoles: value.userRoles.length>0 ? value.userRoles.map(x=> {return {code: x.code}}) : []
        }
        this.showSpinner();
        await this.userService.saveUser(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'User has been saved successfully.'});
        this.router.navigate(['/user-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/user-list'])
  }
}
