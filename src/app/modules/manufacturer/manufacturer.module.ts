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
import { MainManufacturerComponent } from './components/main-manufacturer/main-manufacturer.component';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { NewManufacturerComponent } from './components/new-manufacturer/new-manufacturer.component';
import { DetailManufacturerComponent } from './components/detail-manufacturer/detail-manufacturer.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {DialogService} from 'primeng/dynamicdialog';

@NgModule({
  declarations: [MainManufacturerComponent, NewManufacturerComponent, DetailManufacturerComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainManufacturerComponent },
      {path:'new',component: NewManufacturerComponent},
      {path:':code',component: DetailManufacturerComponent}
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
    FileUploadModule
  ],
  providers: [DialogService]
})
export class ManufacturerModule { }
