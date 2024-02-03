import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService) {
    super(spinner);
    
  } 
  ngOnInit(): void {
    this.authService.deleteAccessToken();
    this.authService.deleteRefreshToken();
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  get formControls(){
    return this.loginForm.controls;
  }

  async login(value){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }

    var request = {
      username: value.username,
      password: value.password
    }

    this.showSpinner();
    await this.loginService.login(request, ()=> {

      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if(returnUrl){
          this.router.navigate([returnUrl])
        }else{
          this.router.navigate([''])
        }
      })

      this.hideSpinner();
    }

    );
  }
}
