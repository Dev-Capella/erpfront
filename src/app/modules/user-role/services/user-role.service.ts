import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {
    constructor(private http: HttpClient) { }

    async getUserRoles(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/user-role`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveUserRole(userRoleData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/user-role`,userRoleData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getUserRoleByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/user-role/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteUserRoleByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/user-role/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}