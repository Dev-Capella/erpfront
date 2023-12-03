import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
    constructor(private messageService: MessageService,
        private spinner: NgxSpinnerService,) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        return next.handle(req).pipe(catchError(error => {
            if (error.status === 0) {
                this.messageService.add({
                    severity: "error",
                    summary: "Bunun Üzerinde Çalışıyoruz",
                    detail: "Servislere şu anda erişilemiyor. Lütfen daha sonra tekrar deneyiniz.",
                })
            }
            else if(error.status === 401){
                this.messageService.add({ severity: 'error', summary: 'Hata', detail: `${error.error.errorMessage}` });
            }
            else if (error.status === 500) {
                this.messageService.add({ severity: 'error', summary: 'Hata', detail: `${error.error.errorMessage}` });
            }
            else{
                error.error.errorMessage ? 
                    this.messageService.add({ severity: 'error', summary: 'Hata', detail: `${error.error.errorMessage}` }) : 
                    this.messageService.add({ severity: 'error', summary: 'Hata', detail: `${error.error.error_message}` })
            }
            this.spinner.hide();
            return of(error.errorMessage);
        }));
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
