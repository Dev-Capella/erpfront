import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { PermissionService } from '../../../permission/services/permission.service';
@Component({
  selector: 'app-new-user-role',
  templateUrl: './new-user-role.component.html',
  styleUrl: './new-user-role.component.scss'
})
export class NewUserRoleComponent extends BaseComponent implements OnInit {
  userRoleForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  permissions: any[] = []
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userRoleService:UserRoleService,
    private permissionService:PermissionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  async ngOnInit(): Promise<void> {
    this.userRoleForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      permissions: new FormControl([])
    });
    await this.getPermissions();
  }

  get formControls(){
    return this.userRoleForm.controls;
  }

  async getPermissions(){
    this.showSpinner();
    this.permissions =  await this.permissionService.getPermissions(()=> this.hideSpinner());
  }

  save(value){
    if(this.userRoleForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-user-role',
      header: 'Transaction Confirmation',
      message: 'The user role is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          permissions: value?.permissions.length>0 ? value.permissions.map(x=> {return {code: x.code}}) : []
        }
        this.showSpinner();
        await this.userRoleService.saveUserRole(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'User role has been saved successfully.'});
        this.router.navigate(['/user-role-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/user-role-list'])
  }
}
