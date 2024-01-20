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
import { MainCostCategoryComponent } from './main-cost-category/main-cost-category.component';
import { RouterModule } from '@angular/router';
import { NewCostCategoryComponent } from './new-cost-category/new-cost-category.component';
import { DetailCostCategoryComponent } from './detail-cost-category/detail-cost-category.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';



@NgModule({
  declarations: [MainCostCategoryComponent,NewCostCategoryComponent,DetailCostCategoryComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCostCategoryComponent },
      {path:'new',component: NewCostCategoryComponent},
      {path:':code',component: DetailCostCategoryComponent}
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
export class CostCategoryModule { }
