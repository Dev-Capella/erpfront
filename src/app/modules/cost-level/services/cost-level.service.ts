import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class CostLevelService {
    constructor(private http: HttpClient) { }

    async getCostLevels(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/cost-level`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveCostLevel(costLevelData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/cost-level`,costLevelData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCostLevelByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/cost-level/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteCostLevelByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/cost-level/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}