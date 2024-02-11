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
import { MultiSelectModule } from 'primeng/multiselect';
import { MainParameterComponent } from './components/main-parameter/main-parameter.component';
import { NewParameterComponent } from './components/new-parameter/new-parameter.component';
import { DetailParameterComponent } from './components/detail-parameter/detail-parameter.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [MainParameterComponent, NewParameterComponent, DetailParameterComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainParameterComponent },
      { path: 'new', component: NewParameterComponent },
      { path: ':code', component: DetailParameterComponent }
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
    MultiSelectModule,
    InputSwitchModule,
    InputNumberModule,
    CheckboxModule
  ]
})
export class ParameterModule { }
