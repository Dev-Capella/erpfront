import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class MarketService {
    constructor(private http: HttpClient) { }

    async getMarkets(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/market`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveMarket(marketData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/market`,marketData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getMarketByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/market/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteMarketByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/market/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}