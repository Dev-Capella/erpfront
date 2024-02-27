import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class ItemTypeService {
    constructor(private http: HttpClient) { }

    async getItemTypes(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-type`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveItemType(itemTypeData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/item-type`,itemTypeData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getItemTypeByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-type/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteItemTypeByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/item-type/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getItemSubCodesByItemType(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-type/${code}/item-sub-code`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getQualityLevelsByItemType(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-type/${code}/quality-level`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getBoMByItemType(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-type/${code}/bom-item-sub-code`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getRoutingItemSubCodeByItemType(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-type/${code}/routing-item-sub-code`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getItemSubCodesByItemTypeForProduct(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-type/${code}/item-sub-code/product`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    
}