import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class DomainModelService {
    constructor(private http: HttpClient) { }

    async getAllDomainModels(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/domain-model`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}