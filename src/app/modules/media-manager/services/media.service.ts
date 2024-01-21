import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { MediaCategory } from '../../../shared/enums/media-category.enum';
const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class MediaService {
    constructor(private http: HttpClient) { }

    async getMediasByMediaCategory(mediaCategory: string,callBackFunction?: () => void){
        const observable = this.http.get<any>(ROOT_PATH + `/media/${mediaCategory}`)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

    async save(file: File, mediaCategory: MediaCategory, callBackFunction?: () => void){
        const formData: FormData = new FormData();
        formData.append('file', file);
        const observable = this.http.post<any>(ROOT_PATH + `/media/${mediaCategory}/upload`, formData)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response.data;
    }

}