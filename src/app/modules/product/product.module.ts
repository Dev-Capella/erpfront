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
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { MainProductComponent } from './components/main-product/main-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';



@NgModule({
  declarations: [MainProductComponent,NewProductComponent,DetailProductComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainProductComponent },
      { path: 'new', component: NewProductComponent },
      { path: ':code', component: DetailProductComponent }
    ]),
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
    InputNumberModule,
    CheckboxModule,
    FormsModule,
    SidebarModule,
    StyleClassModule,
    ConfirmDialogModule,
    MenuModule,
    CommonModule,
    DividerModule,
    DialogModule
  ]
})
export class ProductModule { }
