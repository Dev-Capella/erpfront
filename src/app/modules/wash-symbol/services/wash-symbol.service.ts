import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class WashSymbolService {
    constructor(private http: HttpClient) { }

    async getWashSymbols(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/wash-symbol`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveWashSymbol(washSymbolData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/wash-symbol`,washSymbolData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getWashSymbolByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/wash-symbol/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteWashSymbolByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/wash-symbol/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}