import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import {SplitterModule} from 'primeng/splitter';
import { MainUomComponent } from './components/main-uom/main-uom.component';
import { ResizableModule } from 'angular-resizable-element';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { NewUomComponent } from './components/new-uom/new-uom.component';
import { StyleClassModule } from 'primeng/styleclass';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DetailUomComponent } from './components/detail-uom/detail-uom.component';
@NgModule({
    imports: [
        RouterModule.forChild([
                {path:'',component: MainUomComponent},
                {path:'new',component: NewUomComponent},
                {path:':code',component: DetailUomComponent}
        ]),
        CommonModule,
        TableModule,
        PanelModule,
        SplitterModule,
        ResizableModule,
        ButtonModule,
        TabViewModule,
        MenubarModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        FormsModule,
        MenuModule,
        DividerModule,
        InputTextareaModule,
        CheckboxModule,
        StyleClassModule,
        FormsModule,
        ConfirmDialogModule
    ],
    declarations: [MainUomComponent, NewUomComponent, DetailUomComponent],
    providers: [],
    
})
export class UnitOfMeasureModule { }
