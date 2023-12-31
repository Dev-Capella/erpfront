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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import {SidebarModule} from 'primeng/sidebar';
import { MainCompositionComponent } from './main-composition/main-composition.component';
import { DataCompositionComponent } from './data-composition/data-composition.component';
import { CompositionListComponent } from './composition-list/composition-list.component';
import { CompositionDetailModule } from '../composition-detail/composition-detail.module';
@NgModule({
  declarations: [MainCompositionComponent,DataCompositionComponent,CompositionListComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCompositionComponent }
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
    DropdownModule,
    InputNumberModule,
    CheckboxModule,
    FormsModule,
    SidebarModule,
    CompositionDetailModule
  ]
})
export class CompositionModule { }
