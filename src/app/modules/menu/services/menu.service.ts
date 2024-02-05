import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    constructor(private http: HttpClient) { }

    async getMenusByRoot(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/menu/roots`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getMenuByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/menu/${code}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async saveMenu(menuData, callBackFunction?: () => void){
        const observable = this.http.post<any>(ROOT_PATH + `/menu`,menuData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getMenuItemsByCode(code:string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/menu/${code}/items`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async getMenusForTreeNode(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/menu/tree-node`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}