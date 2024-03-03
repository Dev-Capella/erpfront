import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodService {
    constructor(private http: HttpClient) { }

    async getPaymentMethods(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/payment-method`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async savePaymentMethod(paymentMethodData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/payment-method`,paymentMethodData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getPaymentMethodByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/payment-method/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deletePaymentMethodByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/payment-method/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}