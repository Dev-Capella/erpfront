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
import { MainTransportZoneComponent } from './components/main-transport-zone/main-transport-zone.component';
import { NewTransportZoneComponent } from './components/new-transport-zone/new-transport-zone.component';
import { DetailTransportZoneComponent } from './components/detail-transport-zone/detail-transport-zone.component';
@NgModule({
  declarations: [MainTransportZoneComponent,NewTransportZoneComponent, DetailTransportZoneComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainTransportZoneComponent },
      {path:'new',component: NewTransportZoneComponent},
      {path:':code',component: DetailTransportZoneComponent}
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
export class TransportZoneModule { }
