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
import { MainUserRoleComponent } from './components/main-user-role/main-user-role.component';
import { NewUserRoleComponent } from './components/new-user-role/new-user-role.component';
import { DetailUserRoleComponent } from './components/detail-user-role/detail-user-role.component';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [MainUserRoleComponent, NewUserRoleComponent, DetailUserRoleComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainUserRoleComponent },
      {path:'new',component: NewUserRoleComponent},
      {path:':code',component: DetailUserRoleComponent}
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
export class UserRoleModule { }
