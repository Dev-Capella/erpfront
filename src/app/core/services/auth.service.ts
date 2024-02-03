import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private jwtHelperService: JwtHelperService,
        private cookieService: CookieService) { }


    identityCheck(){
        const token: string = this.getAccessToken();
        let expired:boolean;

        try {
          expired = this.jwtHelperService.isTokenExpired(token);
        } catch{
          expired = true;
        }

        _isAuthenticated = token != null && !expired;
    }

    get isAuthenticated(): boolean {
        return _isAuthenticated;
    }

    getCurrentUser(){
       const accessToken = this.getAccessToken();
       var decodedToken = this.jwtHelperService.decodeToken(accessToken);
       var userModel = {
        username: decodedToken?.sub,
        firstName: decodedToken?.firstName,
        lastName: decodedToken?.lastName,
        roles: decodedToken?.roles
       }
       return userModel;
    }

    getAccessToken(){
        return this.cookieService.get('access_token');
    }

    getRefreshToken(){
        return this.cookieService.get('refresh_token');
    }

    setAccessToken(accessToken: string) {
        this.cookieService.set('access_token', accessToken);
    }

    setRefreshToken(refreshToken: string) {
        this.cookieService.set('refresh_token', refreshToken);
    }

    deleteAccessToken(){
        this.cookieService.delete('access_token');
    }

    deleteRefreshToken(){
        this.cookieService.delete('refresh_token');
    }
    
}

export let _isAuthenticated: boolean = false;