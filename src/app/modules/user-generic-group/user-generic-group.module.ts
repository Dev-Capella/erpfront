import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import {SplitterModule} from 'primeng/splitter';
import { AngularSplitModule } from 'angular-split';
import { ResizableModule } from 'angular-resizable-element';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MainUserGenericGroupComponent } from './components/main-user-generic-group/main-user-generic-group.component';
import { DataUserGenericGroupComponent } from './components/data-user-generic-group/data-user-generic-group.component';
import { UserGenericGroupListComponent } from './components/user-generic-group-list/user-generic-group-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
                {path:'',component: MainUserGenericGroupComponent}
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
    declarations: [MainUserGenericGroupComponent,DataUserGenericGroupComponent, UserGenericGroupListComponent],
    providers: [],
    
})
export class UserGenericGroupModule { }
