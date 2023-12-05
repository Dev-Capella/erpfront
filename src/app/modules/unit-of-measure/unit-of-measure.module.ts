import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import {SplitterModule} from 'primeng/splitter';
import { DetailUomComponent } from './components/detail-uom/detail-uom.component';
import { UomListComponent } from './components/uom-list/uom-list.component';
import { MainUomComponent } from './components/main-uom/main-uom.component';
import { AngularSplitModule } from 'angular-split';
import { ResizableModule } from 'angular-resizable-element';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';

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
        MenubarModule
    ],
    declarations: [DetailUomComponent,UomListComponent, MainUomComponent],
    providers: [],
    
})
export class UnitOfMeasureModule { }
