import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class ItemTypeService {
    keepLeft:BehaviorSubject<boolean> = new BehaviorSubject(true);
    keepLeft$ = this.keepLeft.asObservable();
    keepRight:BehaviorSubject<boolean> = new BehaviorSubject(false);
    keepRight$ = this.keepRight.asObservable();
    isRefreshList:BehaviorSubject<boolean> = new BehaviorSubject(false);
    selectedData:BehaviorSubject<any> = new BehaviorSubject(null);
    selectedData$ = this.selectedData.asObservable();
    visibleQualityTemplate:BehaviorSubject<boolean> = new BehaviorSubject(false);
    visibleQualityTemplate$ = this.visibleQualityTemplate.asObservable();
    visibleSubcodeTemplate:BehaviorSubject<boolean> = new BehaviorSubject(false);
    visibleSubcodeTemplate$ = this.visibleSubcodeTemplate.asObservable();
    visibleBoMTemplate:BehaviorSubject<boolean> = new BehaviorSubject(false);
    visibleBoMTemplate$ = this.visibleBoMTemplate.asObservable();
    visibleRoutingTemplate:BehaviorSubject<boolean> = new BehaviorSubject(false);
    visibleRoutingTemplate$ = this.visibleRoutingTemplate.asObservable();
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

    
}