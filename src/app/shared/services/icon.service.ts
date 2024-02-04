import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { firstValueFrom } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class IconService {
    constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

    apiUrl = 'assets/data/prime-ng-icons.json';

    getBaseUrl() {
        return `${this.document.location.protocol}//${this.document.location.host}/`;
    }

    async getIcons(callBackFunction?: () => void) {
        const apiUrl = this.getBaseUrl() + this.apiUrl;
        const observable = this.http.get<any>(apiUrl)
        const response = await firstValueFrom(observable);
        callBackFunction();
        return response;
    }
}