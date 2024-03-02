import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class AreaService {
    constructor(private http: HttpClient) { }

    async getAreas(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/area`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveArea(areaData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/area`,areaData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getAreaByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/area/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteAreaByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/area/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}