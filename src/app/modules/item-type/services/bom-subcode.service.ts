import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})

export class BoMSubcodeService {
    constructor(private http: HttpClient) { }

    async saveBoM(bomData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/bom-item-sub-code`,bomData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getBoMByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/bom-item-sub-code/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteBoMByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/bom-item-sub-code/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}