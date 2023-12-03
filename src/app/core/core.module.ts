import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgModule} from '@angular/core';
import { HttpErrorHandlerInterceptorService } from './interceptors/http-error-handler-interceptor.service';

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true}
    ],
})
export class CoreModule { }
