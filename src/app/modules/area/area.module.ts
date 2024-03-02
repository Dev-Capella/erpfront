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
import { MainAreaComponent } from './components/main-area/main-area.component';
import { NewAreaComponent } from './components/new-area/new-area.component';
import { DetailAreaComponent } from './components/detail-area/detail-area.component';
import { ToolbarModule } from 'primeng/toolbar';
@NgModule({
  declarations: [MainAreaComponent,NewAreaComponent, DetailAreaComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainAreaComponent },
      {path:'new',component: NewAreaComponent},
      {path:':code',component: DetailAreaComponent}
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
    ToolbarModule
  ]
})
export class AreaModule { }
