import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class CounterService {
    constructor(private http: HttpClient) { }

    async getCounters(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/counter`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveCounter(counterData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/counter`,counterData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCounterByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/counter/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteCounterByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/counter/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getSubSeriesByCounter(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/counter/${code}/sub-series`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}