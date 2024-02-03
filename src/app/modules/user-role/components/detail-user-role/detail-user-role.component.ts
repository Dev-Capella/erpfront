import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'app-detail-user-role',
  templateUrl: './detail-user-role.component.html',
  styleUrl: './detail-user-role.component.scss'
})
export class DetailUserRoleComponent extends BaseComponent implements OnInit {
  userRoleForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  permissions: any[] = []
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userRoleService:UserRoleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
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
    await this.getUserRoleByCode();
  }

  get formControls(){
    return this.userRoleForm.controls;
  }

  async getUserRoleByCode(){
    this.showSpinner();
    var result = await this.userRoleService.getUserRoleByCode(this.code, ()=> this.hideSpinner());
    this.userRoleForm.patchValue({
      id: result.id,
      code: result.code,
      shortText: result.shortText,
      longText: result.longText,
      searchText: result.searchText,
    })
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
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
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
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
