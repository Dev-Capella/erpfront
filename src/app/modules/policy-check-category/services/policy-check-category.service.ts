import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class PolicyCheckCategoryService {
    constructor(private http: HttpClient) { }

    async getPolicyCheckCategories(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/policy-check-category`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async savePolicyCheckCategory(policyCheckCategoryData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/policy-check-category`,policyCheckCategoryData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getPolicyCheckCategoryByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/policy-check-category/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deletePolicyCheckCategoryByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/policy-check-category/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}