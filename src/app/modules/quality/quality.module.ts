import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainQualityComponent } from './components/main-quality/main-quality.component';
import { DataQualityComponent } from './components/data-quality/data-quality.component';
import { QualityListComponent } from './components/quality-list/quality-list.component';
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
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';



@NgModule({
  declarations: [MainQualityComponent, DataQualityComponent, QualityListComponent],
  imports: [
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
    InputNumberModule,
    CheckboxModule,
    FormsModule
  ],
  exports: [MainQualityComponent],
})
export class QualityModule { }
