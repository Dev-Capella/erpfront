import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleService } from '../../../user-role/services/user-role.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.scss'
})
export class DetailUserComponent extends BaseComponent implements OnInit {
  userForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  userRoles: any[] = []
  username: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userService:UserService,
    private userRoleService: UserRoleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.username = this.route.snapshot.params['username']
  }
  async ngOnInit(): Promise<void> {
    this.userForm = this.formBuilder.group({
      id: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      username: new FormControl(null),
      email: new FormControl(null),
      phoneNumber: new FormControl(null),
      userRoles: new FormControl([])
    });
    await this.getUserRoles();
    await this.getUserByUsername();
  }

  get formControls(){
    return this.userForm.controls;
  }

  async getUserByUsername(){
    this.showSpinner();
    var result = await this.userService.getUserByUsername(this.username, ()=> this.hideSpinner());
    this.userForm.patchValue({
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      username: result.username,
      email: result.email,
      phoneNumber: result.phoneNumber,
      userRoles: this.userRoles.filter(userRole => result.userRoles.map(userRole => userRole.code).includes(userRole.code))
    })
    this.descriptionText = `Firstname: ${result.firstName ? result.firstName : "-"}, Lastname: ${result.lastName ? result.lastName : "-"}, Email: ${result.email ? result.email : "-"}`
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
          id: value?.id,
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
