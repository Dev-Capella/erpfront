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
import { MainPermissionComponent } from './components/main-permission/main-permission.component';
import { NewPermissionComponent } from './components/new-permission/new-permission.component';
import { DetailPermissionComponent } from './components/detail-permission/detail-permission.component';


@NgModule({
  declarations: [MainPermissionComponent,NewPermissionComponent,DetailPermissionComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainPermissionComponent },
      {path:'new',component: NewPermissionComponent},
      {path:':code',component: DetailPermissionComponent}
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
export class PermissionModule { }
