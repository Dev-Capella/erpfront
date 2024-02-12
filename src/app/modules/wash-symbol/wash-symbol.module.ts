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
import { MainWashSymbolComponent } from './components/main-wash-symbol/main-wash-symbol.component';
import { NewWashSymbolComponent } from './components/new-wash-symbol/new-wash-symbol.component';
import { DetailWashSymbolComponent } from './components/detail-wash-symbol/detail-wash-symbol.component';

@NgModule({
  declarations: [MainWashSymbolComponent,NewWashSymbolComponent,DetailWashSymbolComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainWashSymbolComponent },
      { path: 'new', component: NewWashSymbolComponent },
      { path: ':code', component: DetailWashSymbolComponent }
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
    ConfirmDialogModule
  ]
})
export class WashSymbolModule { }
