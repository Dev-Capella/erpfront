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
import { MainItemSubCodeCheckTypeComponent } from './components/main-item-sub-code-check-type/main-item-sub-code-check-type.component';
import { NewItemSubCodeCheckTypeComponent } from './components/new-item-sub-code-check-type/new-item-sub-code-check-type.component';
import { DetailItemSubCodeCheckTypeComponent } from './components/detail-item-sub-code-check-type/detail-item-sub-code-check-type.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [MainItemSubCodeCheckTypeComponent, NewItemSubCodeCheckTypeComponent,DetailItemSubCodeCheckTypeComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainItemSubCodeCheckTypeComponent },
      {path:'new',component: NewItemSubCodeCheckTypeComponent},
      {path:':code',component: DetailItemSubCodeCheckTypeComponent}
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
    MultiSelectModule
  ]
})
export class ItemSubCodeCheckTypeModule { }
