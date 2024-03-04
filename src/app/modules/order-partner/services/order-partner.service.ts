import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class OrderPartnerService {
    constructor(private http: HttpClient) { }

    async getOrderPartners(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/order-partner`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveOrderPartner(orderPartnerData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/order-partner`,orderPartnerData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getOrderPartnerByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/order-partner/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteOrderPartnerByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/order-partner/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}