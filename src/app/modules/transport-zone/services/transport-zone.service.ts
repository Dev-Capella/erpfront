import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class TransportZoneService {
    constructor(private http: HttpClient) { }

    async getTransportZones(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/transport-zone`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveTransportZone(costLevelData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/transport-zone`,costLevelData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getTransportZoneByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/transport-zone/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteTransportZoneByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/transport-zone/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}