import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { BaseComponent } from '../../../../core/components/base/base.component';

@Component({
  selector: 'app-detail-permission',
  templateUrl: './detail-permission.component.html',
  styleUrl: './detail-permission.component.scss'
})
export class DetailPermissionComponent extends BaseComponent implements OnInit {
  permissionForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private permissionService:PermissionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.permissionForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
    await this.getPermissionByCode();
  }

  get formControls(){
    return this.permissionForm.controls;
  }

  async getPermissionByCode(){
    this.showSpinner();
    var result = await this.permissionService.getPermissionByCode(this.code, ()=> this.hideSpinner());
    this.permissionForm.setValue(result);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
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
          id: value?.id,
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
