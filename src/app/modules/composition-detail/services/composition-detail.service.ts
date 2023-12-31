import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class CompositionDetailService {
    keepLeft:BehaviorSubject<boolean> = new BehaviorSubject(true);
    keepLeft$ = this.keepLeft.asObservable();
    keepRight:BehaviorSubject<boolean> = new BehaviorSubject(false);
    keepRight$ = this.keepRight.asObservable();
    isRefreshList:BehaviorSubject<boolean> = new BehaviorSubject(false);
    isRefreshList$= this.isRefreshList.asObservable();
    selectedData:BehaviorSubject<any> = new BehaviorSubject(null);
    selectedData$ = this.selectedData.asObservable();
    constructor(private http: HttpClient) { }

    async saveCompositionDetail(compositionDetailData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/composition-detail`,compositionDetailData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCompositionDetailByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/composition-detail/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteCompositionDetailByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/composition-detail/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}