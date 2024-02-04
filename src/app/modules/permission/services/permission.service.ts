import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    constructor(private http: HttpClient) { }

    async getPermissions(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/permission`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async savePermission(permissionData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/permission`,permissionData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getPermissionByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/permission/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deletePermissionByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/permission/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}