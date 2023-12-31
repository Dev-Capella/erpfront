import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class UserGenericGroupService {
    keepLeft:BehaviorSubject<boolean> = new BehaviorSubject(true);
    keepLeft$ = this.keepLeft.asObservable();
    keepRight:BehaviorSubject<boolean> = new BehaviorSubject(false);
    keepRight$ = this.keepRight.asObservable();
    isRefreshList:BehaviorSubject<boolean> = new BehaviorSubject(false);
    selectedData:BehaviorSubject<any> = new BehaviorSubject(null);
    selectedData$ = this.selectedData.asObservable();

    constructor(private http: HttpClient) { }

    async getUserGenericGroups(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/user-generic-group`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveUserGenericGroup(userGenericGroupData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/user-generic-group`,userGenericGroupData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getUserGenericGroupByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/user-generic-group/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteUserGenericGroupByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/user-generic-group/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}