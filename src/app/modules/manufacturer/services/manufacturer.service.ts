import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class ManufacturerService {
    keepLeft:BehaviorSubject<boolean> = new BehaviorSubject(true);
    keepLeft$ = this.keepLeft.asObservable();
    keepRight:BehaviorSubject<boolean> = new BehaviorSubject(false);
    keepRight$ = this.keepRight.asObservable();
    isRefreshList:BehaviorSubject<boolean> = new BehaviorSubject(false);
    selectedData:BehaviorSubject<any> = new BehaviorSubject(null);
    selectedData$ = this.selectedData.asObservable();

    constructor(private http: HttpClient) { }

    async getManufacturers(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/manufacturer`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveManufacturer(manufacturerData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/manufacturer`,manufacturerData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getManufacturerByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/manufacturer/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteManufacturerByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/manufacturer/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}