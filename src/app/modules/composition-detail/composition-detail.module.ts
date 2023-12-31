import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MainCompositionDetailComponent } from './main-composition-detail/main-composition-detail.component';
import { DataCompositionDetailComponent } from './data-composition-detail/data-composition-detail.component';
import { CompositionDetailListComponent } from './composition-detail-list/composition-detail-list.component';


@NgModule({
  declarations: [MainCompositionDetailComponent,DataCompositionDetailComponent,CompositionDetailListComponent],
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
  exports: [MainCompositionDetailComponent],
})
export class CompositionDetailModule { }
