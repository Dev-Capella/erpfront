import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class CompositionComponentService {
    constructor(private http: HttpClient) { }

    async getCompositionComponents(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/composition-component`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveCompositionComponent(compositionComponentData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/composition-component`,compositionComponentData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCompositionComponentByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/composition-component/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteCompositionComponentByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/composition-component/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}