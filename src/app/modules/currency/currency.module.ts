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
import { MainCurrencyComponent } from './components/main-currency/main-currency.component';
import { NewCurrencyComponent } from './components/new-currency/new-currency.component';
import { DetailCurrencyComponent } from './components/detail-currency/detail-currency.component';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [MainCurrencyComponent, NewCurrencyComponent, DetailCurrencyComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCurrencyComponent },
      { path: 'new', component: NewCurrencyComponent },
      { path: ':code', component: DetailCurrencyComponent }
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
    InputNumberModule
  ]
})
export class CurrencyModule { }
