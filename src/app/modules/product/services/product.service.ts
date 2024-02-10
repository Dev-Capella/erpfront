import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) { }

    async getProducts(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/product`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveProduct(productData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/product`,productData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getProductByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/product/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteProductByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/product/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}