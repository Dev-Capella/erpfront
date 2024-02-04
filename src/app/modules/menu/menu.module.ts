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
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NewMenuComponent } from './components/new-menu/new-menu.component';
import { DetailMenuComponent } from './components/detail-menu/detail-menu.component';
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';

@NgModule({
  declarations: [MainMenuComponent, NewMenuComponent, DetailMenuComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainMenuComponent },
      { path: 'new', component: NewMenuComponent },
      { path: ':code', component: DetailMenuComponent }
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
    InputNumberModule,
    TreeTableModule,
    CheckboxModule,
    TreeSelectModule
  ]
})
export class MenuModule { }
