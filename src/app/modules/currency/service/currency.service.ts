import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    constructor(private http: HttpClient) { }

    async getCurrencies(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/currency`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveCurrency(currencyData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/currency`,currencyData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCurrencyByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/currency/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteCurrencyByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/currency/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}