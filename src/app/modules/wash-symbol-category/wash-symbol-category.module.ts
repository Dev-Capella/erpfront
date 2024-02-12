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
import { MainWashSymbolCategoryComponent } from './components/main-wash-symbol-category/main-wash-symbol-category.component';
import { NewWashSymbolCategoryComponent } from './components/new-wash-symbol-category/new-wash-symbol-category.component';
import { DetailWashSymbolCategoryComponent } from './components/detail-wash-symbol-category/detail-wash-symbol-category.component';

@NgModule({
  declarations: [MainWashSymbolCategoryComponent,NewWashSymbolCategoryComponent,DetailWashSymbolCategoryComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainWashSymbolCategoryComponent },
      { path: 'new', component: NewWashSymbolCategoryComponent },
      { path: ':code', component: DetailWashSymbolCategoryComponent }
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
export class WashSymbolCategoryModule { }
