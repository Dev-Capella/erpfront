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
import { MainCostLevelComponent } from './main-cost-level/main-cost-level.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StyleClassModule } from 'primeng/styleclass';
import { NewCostLevelComponent } from './new-cost-level/new-cost-level.component';
import { DetailCostLevelComponent } from './detail-cost-level/detail-cost-level.component';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MainCostLevelComponent,NewCostLevelComponent, DetailCostLevelComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCostLevelComponent },
      {path:'new',component: NewCostLevelComponent},
      {path:':code',component: DetailCostLevelComponent}
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
export class CostLevelModule { }
