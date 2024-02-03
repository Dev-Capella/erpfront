import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelperService = inject(JwtHelperService);
  const router = inject(Router);
  const messageService = inject(MessageService);
  const token: string = localStorage.getItem("accessToken")
  // const decodeToken = jwtHelperService.decodeToken(token);

  let expired:boolean;

  try {
    expired = jwtHelperService.isTokenExpired(token);
  } catch{
    expired = true;
  }

  if(!token || expired){
    router.navigate(["login"], {queryParams: {returnUrl: state.url}})
    messageService.add({severity:'error', summary:'Transaction Result', detail:'Yout must login'});
  }

  return true;
};
