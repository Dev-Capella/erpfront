import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
const ROOT_PATH = environment.hostRoot;

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient,
        private authService:AuthService) { }

    async login(loginRequest, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/login`,loginRequest)
        const response = await firstValueFrom(observable);
        this.authService.setAccessToken(response.accessToken);
        this.authService.setRefreshToken(response.refreshToken);
        callBackFunction();

    }

}