import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class ProductionGroupService {
    constructor(private http: HttpClient) { }

    async getProductionGroups(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/production-group`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveProductionGroup(productionGroupData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/production-group`,productionGroupData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getProductionGroupByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/production-group/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteProductionGroupByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/production-group/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}