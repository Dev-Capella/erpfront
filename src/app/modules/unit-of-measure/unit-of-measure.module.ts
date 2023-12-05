import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import {SplitterModule} from 'primeng/splitter';
import { DataUomComponent } from './components/data-uom/data-uom.component';
import { UomListComponent } from './components/uom-list/uom-list.component';
import { MainUomComponent } from './components/main-uom/main-uom.component';
import { AngularSplitModule } from 'angular-split';
import { ResizableModule } from 'angular-resizable-element';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        RouterModule.forChild([
                {path:'',component: MainUomComponent}
        ]),
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
        DropdownModule
    ],
    declarations: [DataUomComponent,UomListComponent, MainUomComponent],
    providers: [],
    
})
export class UnitOfMeasureModule { }
