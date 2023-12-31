import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class CompositionService {
    keepLeft:BehaviorSubject<boolean> = new BehaviorSubject(true);
    keepLeft$ = this.keepLeft.asObservable();
    keepRight:BehaviorSubject<boolean> = new BehaviorSubject(false);
    keepRight$ = this.keepRight.asObservable();
    isRefreshList:BehaviorSubject<boolean> = new BehaviorSubject(false);
    selectedData:BehaviorSubject<any> = new BehaviorSubject(null);
    selectedData$ = this.selectedData.asObservable();
    visibleCompositionDetailTemplate:BehaviorSubject<boolean> = new BehaviorSubject(false);
    visibleCompositionDetailTemplate$ = this.visibleCompositionDetailTemplate.asObservable();
    constructor(private http: HttpClient) { }

    async getCompositions(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/composition`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveComposition(compositonData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/composition`,compositonData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCompositionByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/composition/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteCompositionByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/composition/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCompositionDetailsByComposition(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/composition/${code}/composition-detail`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }
    
}