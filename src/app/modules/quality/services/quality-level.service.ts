import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class QualityLevelService {
    keepLeft:BehaviorSubject<boolean> = new BehaviorSubject(true);
    keepLeft$ = this.keepLeft.asObservable();
    keepRight:BehaviorSubject<boolean> = new BehaviorSubject(false);
    keepRight$ = this.keepRight.asObservable();
    isRefreshList:BehaviorSubject<boolean> = new BehaviorSubject(false);
    isRefreshList$= this.isRefreshList.asObservable();
    selectedData:BehaviorSubject<any> = new BehaviorSubject(null);
    selectedData$ = this.selectedData.asObservable();
    constructor(private http: HttpClient) { }

    async saveQualityLevel(qualityLevelData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/quality-level`,qualityLevelData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getQualityLevelByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/quality-level/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteQualityLevelByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/quality-level/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}