import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class ParameterService {
    constructor(private http: HttpClient) { }

    async getParameters(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/parameter`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveParameter(parameterData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/parameter`,parameterData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getParameterByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/parameter/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteParameterByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/parameter/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}