import {NgModule} from '@angular/core';
import { UnitOfMeasureListComponent } from './components/unit-of-measure-list/unit-of-measure-list.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';

@NgModule({
    imports: [
        RouterModule.forChild([
                {path:'',component: UnitOfMeasureListComponent}
        ]),
        TableModule,
        PanelModule
    ],
    declarations: [UnitOfMeasureListComponent],
    providers: [],
    
})
export class UnitOfMeasureModule { }
