import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class SubSeriesService {
    constructor(private http: HttpClient) { }

    async saveSubSeries(subSeriesData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/sub-series`,subSeriesData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getSubSeriesByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/sub-series/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteSubSeriesByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/sub-series/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}