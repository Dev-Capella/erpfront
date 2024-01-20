import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class ItemSubCodeService {
    constructor(private http: HttpClient) { }

    async saveItemSubCode(itemSubCodeData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/item-sub-code`,itemSubCodeData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getItemSubCodeByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/item-sub-code/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteItemSubCodeByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/item-sub-code/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}