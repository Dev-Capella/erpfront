import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSubcodeComponent } from './components/main-subcode/main-subcode.component';
import { DataSubcodeComponent } from './components/data-subcode/data-subcode.component';
import { SubcodeListComponent } from './components/subcode-list/subcode-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ResizableModule } from 'angular-resizable-element';
import { AngularSplitModule } from 'angular-split';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [MainSubcodeComponent, DataSubcodeComponent, SubcodeListComponent],
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
  exports: [MainSubcodeComponent],
})
export class SubcodeModule { }
