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
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MainOrderPartnerComponent } from './components/main-order-partner/main-order-partner.component';
import { NewOrderPartnerComponent } from './components/new-order-partner/new-order-partner.component';
import { DetailOrderPartnerComponent } from './components/detail-order-partner/detail-order-partner.component';
@NgModule({
  declarations: [MainOrderPartnerComponent,NewOrderPartnerComponent, DetailOrderPartnerComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainOrderPartnerComponent },
      {path:'new',component: NewOrderPartnerComponent},
      {path:':code',component: DetailOrderPartnerComponent}
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
    ToolbarModule,
    MenuModule
  ]
})
export class OrderPartnerModule { }
