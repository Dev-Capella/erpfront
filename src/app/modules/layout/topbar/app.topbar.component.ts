import { Component } from '@angular/core';
import { AppMainComponent } from '../main/app.main.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    user: any;
    constructor(public app: AppMainComponent,
      private authService: AuthService,
      private router: Router) {
        this.user = this.authService.getCurrentUser();
      }

      signOut(){
        this.authService.deleteAccessToken();
        this.authService.deleteRefreshToken();
        this.router.navigate(['login'])
      }
}
