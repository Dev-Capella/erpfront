import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;
const SCHEDULED_TASK_PATH = environment.scheduledTaskRoot;

@Injectable({
    providedIn: 'root'
})
export class CronJobService {
    constructor(private http: HttpClient) { }

    async getCronJobs(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/cron-job`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveCronJob(cronJobData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/cron-job`,cronJobData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getCronJobByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/cron-job/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteCronJobByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/cron-job/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async runCronJob(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(SCHEDULED_TASK_PATH + `/cron-job/run/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}