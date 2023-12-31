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
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MainCostLevelComponent } from './main-cost-level/main-cost-level.component';
import { DataCostLevelComponent } from './data-cost-level/data-cost-level.component';
import { CostLevelListComponent } from './cost-level-list/cost-level-list.component';

@NgModule({
  declarations: [MainCostLevelComponent, DataCostLevelComponent, CostLevelListComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCostLevelComponent }
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
export class CostLevelModule { }
