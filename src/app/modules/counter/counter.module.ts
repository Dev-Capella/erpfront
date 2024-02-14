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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { MainCounterComponent } from './components/main-counter/main-counter.component';
import { NewCounterComponent } from './components/new-counter/new-counter.component';
import { DetailCounterComponent } from './components/detail-counter/detail-counter.component';
import { SubSeriesComponent } from './components/sub-series/sub-series.component';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [MainCounterComponent, NewCounterComponent, DetailCounterComponent,SubSeriesComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCounterComponent },
      { path: 'new', component: NewCounterComponent },
      { path: ':code', component: DetailCounterComponent }
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
    DropdownModule,
    StyleClassModule,
    FormsModule,
    DividerModule,
    ConfirmDialogModule,
    CheckboxModule,
    InputNumberModule,
    DialogModule
  ]
})
export class CounterModule { }
