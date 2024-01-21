import {NgModule} from '@angular/core';
import { GenericMediaListComponent } from './components/generic-media-list/generic-media-list.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RadioButtonModule, 
        FormsModule,
        ButtonModule
    ],
    declarations: [GenericMediaListComponent],
    providers: [],
})
export class SharedModule { }
