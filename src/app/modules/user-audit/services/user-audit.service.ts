import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class UserAuditService {
    constructor(private http: HttpClient) { }

    async getUserAudits(callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/user-audit`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}