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
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MainCompositionComponentComponent } from './main-composition-component/main-composition-component.component';
import { CompositionComponentListComponent } from './composition-component-list/composition-component-list.component';
import { DataCompositionComponentComponent } from './data-composition-component/data-composition-component.component';



@NgModule({
  declarations: [MainCompositionComponentComponent,CompositionComponentListComponent,DataCompositionComponentComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCompositionComponentComponent }
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
  ]
})
export class CompositionComponentModule { }
