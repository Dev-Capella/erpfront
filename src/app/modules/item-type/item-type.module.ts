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
import { MainItemTypeComponent } from './components/main-item-type/main-item-type.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { NewItemTypeComponent } from './components/new-item-type/new-item-type.component';
import { DetailItemTypeComponent } from './components/detail-item-type/detail-item-type.component';
import { DividerModule } from 'primeng/divider';
import { QualityComponent } from './components/quality/quality.component';
import { SubcodeComponent } from './components/subcode/subcode.component';
import { RoutingSbcComponent } from './components/routing-sbc/routing-sbc.component';
import { BomSbcComponent } from './components/bom-sbc/bom-sbc.component';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [MainItemTypeComponent, NewItemTypeComponent,DetailItemTypeComponent, QualityComponent,SubcodeComponent,RoutingSbcComponent,BomSbcComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainItemTypeComponent },
      { path: 'new', component: NewItemTypeComponent },
      { path: ':code', component: DetailItemTypeComponent }
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
    DialogModule,
    DynamicDialogModule,
    AccordionModule
  ]
})
export class ItemTypeModule { }
