import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    async getUsers(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/user`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveUser(manufacturerData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/user`,manufacturerData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getUserByUsername(username:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/user/${username}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async deleteUserByUsername(username:string,callBackFunction?: () => void){
        const observable = this.http.delete<any>(ROOT_PATH + `/user/${username}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}