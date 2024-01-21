import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ResizableModule } from 'angular-resizable-element';
import { AngularSplitModule } from 'angular-split';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { MainProductionGroupComponent } from './components/main-production-group/main-production-group.component';
import { NewProductionGroupComponent } from './components/new-production-group/new-production-group.component';
import { DetailProductionGroupComponent } from './components/detail-production-group/detail-production-group.component';

@NgModule({
  declarations: [MainProductionGroupComponent,NewProductionGroupComponent,DetailProductionGroupComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainProductionGroupComponent },
      {path:'new',component: NewProductionGroupComponent},
      {path:':code',component: DetailProductionGroupComponent}
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
export class ProductionGroupModule { }
