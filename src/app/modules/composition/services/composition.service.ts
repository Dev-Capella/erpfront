import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class CompositionService {
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