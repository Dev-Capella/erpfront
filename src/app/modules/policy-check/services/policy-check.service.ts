import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class PolicyCheckService {
    constructor(private http: HttpClient) { }

    async getPolicyChecks(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/policy-check`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async savePolicyCheck(policyCheckData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/policy-check`,policyCheckData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getPolicyCheckByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/policy-check/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deletePolicyCheckByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/policy-check/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}