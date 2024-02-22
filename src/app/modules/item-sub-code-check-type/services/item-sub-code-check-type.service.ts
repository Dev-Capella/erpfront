import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class ItemSubCodeCheckTypeService {
    constructor(private http: HttpClient) { }

    async getItemSubCodeCheckTypes(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-sub-code-check-type`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveItemSubCodeCheckType(costLevelData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/item-sub-code-check-type`,costLevelData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getItemSubCodeCheckTypeByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-sub-code-check-type/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteItemSubCodeCheckTypeByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/item-sub-code-check-type/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getItemSubCodeCheckTypeByPolicy(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-sub-code-check-type/${code}/policy`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}