import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class CostCategoryService {
    keepLeft:BehaviorSubject<boolean> = new BehaviorSubject(true);
    keepLeft$ = this.keepLeft.asObservable();
    keepRight:BehaviorSubject<boolean> = new BehaviorSubject(false);
    keepRight$ = this.keepRight.asObservable();
    isRefreshList:BehaviorSubject<boolean> = new BehaviorSubject(false);
    selectedData:BehaviorSubject<any> = new BehaviorSubject(null);
    selectedData$ = this.selectedData.asObservable();

    constructor(private http: HttpClient) { }

    async getCostCategories(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/cost-category`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveCostCategory(costCategoryData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/cost-category`,costCategoryData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCostCategoryByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/cost-category/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteCostCategoryByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/cost-category/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}