import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class CounterTypeService {
    constructor(private http: HttpClient) { }

    async getCounterTypes(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/counter-type`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveCounterType(counterTypeData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/counter-type`,counterTypeData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCounterTypeByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/counter-type/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteCounterTypeByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/counter-type/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}