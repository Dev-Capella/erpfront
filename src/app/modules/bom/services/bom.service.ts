import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})

export class BoMService {
    keepLeft:BehaviorSubject<boolean> = new BehaviorSubject(true);
    keepLeft$ = this.keepLeft.asObservable();
    keepRight:BehaviorSubject<boolean> = new BehaviorSubject(false);
    keepRight$ = this.keepRight.asObservable();
    isRefreshList:BehaviorSubject<boolean> = new BehaviorSubject(false);
    isRefreshList$= this.isRefreshList.asObservable();
    selectedData:BehaviorSubject<any> = new BehaviorSubject(null);
    selectedData$ = this.selectedData.asObservable();
    constructor(private http: HttpClient) { }

    async saveBoM(bomData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/bom-item-sub-code`,bomData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getBoMByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/bom-item-sub-code/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteBoMByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/bom-item-sub-code/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}