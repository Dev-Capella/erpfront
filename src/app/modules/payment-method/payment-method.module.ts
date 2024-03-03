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
import { MainPaymentMethodComponent } from './components/main-payment-method/main-payment-method.component';
import { NewPaymentMethodComponent } from './components/new-payment-method/new-payment-method.component';
import { DetailPaymentMethodComponent } from './components/detail-payment-method/detail-payment-method.component';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  declarations: [MainPaymentMethodComponent,NewPaymentMethodComponent, DetailPaymentMethodComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainPaymentMethodComponent },
      {path:'new',component: NewPaymentMethodComponent},
      {path:':code',component: DetailPaymentMethodComponent}
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
    MenuModule,
    CheckboxModule
  ]
})
export class PaymentMethodModule { }
