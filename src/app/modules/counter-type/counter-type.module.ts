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
import { MainCounterTypeComponent } from './components/main-counter-type/main-counter-type.component';
import { NewCounterTypeComponent } from './components/new-counter-type/new-counter-type.component';
import { DetailCounterTypeComponent } from './components/detail-counter-type/detail-counter-type.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
  declarations: [MainCounterTypeComponent,NewCounterTypeComponent, DetailCounterTypeComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCounterTypeComponent },
      {path:'new',component: NewCounterTypeComponent},
      {path:':code',component: DetailCounterTypeComponent}
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
    InputNumberModule
  ]
})
export class CounterTypeModule { }
