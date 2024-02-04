import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { BaseComponent } from '../../../../core/components/base/base.component';

@Component({
  selector: 'app-new-permission',
  templateUrl: './new-permission.component.html',
  styleUrl: './new-permission.component.scss'
})
export class NewPermissionComponent extends BaseComponent implements OnInit {
  permissionForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private permissionService:PermissionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.permissionForm = this.formBuilder.group({
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
  }

  get formControls(){
    return this.permissionForm.controls;
  }

  save(value){
    if(this.permissionForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-permission',
      header: 'Transaction Confirmation',
      message: 'The permission is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        await this.permissionService.savePermission(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Permission has been saved successfully.'});
        this.router.navigate(['/permission-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/permission-list'])
  }
}
