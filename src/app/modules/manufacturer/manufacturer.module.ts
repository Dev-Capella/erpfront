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
import { MainManufacturerComponent } from './components/main-manufacturer/main-manufacturer.component';
import { DataManufacturerComponent } from './components/data-manufacturer/data-manufacturer.component';
import { ManufacturerListComponent } from './components/manufacturer-list/manufacturer-list.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MainManufacturerComponent,DataManufacturerComponent,ManufacturerListComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainManufacturerComponent }
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
    DropdownModule
  ]
})
export class ManufacturerModule { }
