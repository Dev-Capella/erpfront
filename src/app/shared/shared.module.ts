import {NgModule} from '@angular/core';
import { GenericMediaListComponent } from './components/generic-media-list/generic-media-list.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        RadioButtonModule, 
        FormsModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule
    ],
    declarations: [GenericMediaListComponent,LoginComponent],
    providers: [],
})
export class SharedModule { }
