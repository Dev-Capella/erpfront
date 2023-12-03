import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgModule} from '@angular/core';
import { HttpErrorHandlerInterceptorService } from './interceptors/http-error-handler-interceptor.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [ToastModule],
    declarations: [],
    providers: [
        MessageService,
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true}
    ],
})
export class CoreModule { }
