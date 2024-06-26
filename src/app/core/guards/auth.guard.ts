import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const authService = inject(AuthService);

  authService.identityCheck();
  
  if(!(authService.isAuthenticated)){
    router.navigate(["login"], {queryParams: {returnUrl: state.url}})
    messageService.add({severity:'error', summary:'Transaction Result', detail:'Yout must login'});
  }

  return true;
};
