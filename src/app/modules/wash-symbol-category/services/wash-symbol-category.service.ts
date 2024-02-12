import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class WashSymbolCategoryService {
    constructor(private http: HttpClient) { }

    async getWashSymbolCategories(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/wash-symbol-category`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveWashSymbolCategory(washSymbolCategoryData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/wash-symbol-category`,washSymbolCategoryData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getWashSymbolCategoryByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/wash-symbol-category/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteWashSymbolCategoryByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/wash-symbol-category/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}