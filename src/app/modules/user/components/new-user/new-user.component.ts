import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent extends BaseComponent implements OnInit {
  userForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userService:UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      username: new FormControl(null),
      definedPassword: new FormControl(null),
      email: new FormControl(null),
      phoneNumber: new FormControl(null),
    });
  }

  get formControls(){
    return this.userForm.controls;
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
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
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
