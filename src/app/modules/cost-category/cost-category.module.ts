import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ResizableModule } from 'angular-resizable-element';
import { AngularSplitModule } from 'angular-split';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { MainCostCategoryComponent } from './main-cost-category/main-cost-category.component';
import { DataCostCategoryComponent } from './data-cost-category/data-cost-category.component';
import { CostCategoryListComponent } from './cost-category-list/cost-category-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MainCostCategoryComponent, DataCostCategoryComponent, CostCategoryListComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCostCategoryComponent }
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
    DropdownModule
  ]
})
export class CostCategoryModule { }
