import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { AngularSplitModule } from 'angular-split';
import { ResizableModule } from 'angular-resizable-element';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MainUserGenericGroupComponent } from './components/main-user-generic-group/main-user-generic-group.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { NewUserGenericGroupComponent } from './components/new-user-generic-group/new-user-generic-group.component';
import { DetailUserGenericGroupComponent } from './components/detail-user-generic-group/detail-user-generic-group.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MainUserGenericGroupComponent },
            { path: 'new', component: NewUserGenericGroupComponent },
            { path: ':code', component: DetailUserGenericGroupComponent }
        ]),
        CommonModule,
        TableModule,
        PanelModule,
        SplitterModule,
        AngularSplitModule,
        ResizableModule,
        ButtonModule,
        TabViewModule,
        MenubarModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        StyleClassModule,
        FormsModule,
        DividerModule,
        ConfirmDialogModule,
        InputNumberModule
    ],
    declarations: [MainUserGenericGroupComponent, NewUserGenericGroupComponent, DetailUserGenericGroupComponent],
    providers: [],

})
export class UserGenericGroupModule { }
