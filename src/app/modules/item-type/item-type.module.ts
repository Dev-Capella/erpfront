import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import {SplitterModule} from 'primeng/splitter';
import { AngularSplitModule } from 'angular-split';
import { ResizableModule } from 'angular-resizable-element';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MainItemTypeComponent } from './components/main-item-type/main-item-type.component';
import { ItemTypeListComponent } from './components/item-type-list/item-type-list.component';
import { DataItemTypeComponent } from './components/data-item-type/data-item-type.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import {SidebarModule} from 'primeng/sidebar';
import { QualityModule } from '../quality/quality.module';
import { SubcodeModule } from '../subcode/subcode.module';
import { BoMModule } from '../bom/bom.module';
import { RoutingModule } from '../routing-item-sub-code/routing.module';
@NgModule({
  declarations: [MainItemTypeComponent,ItemTypeListComponent,DataItemTypeComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainItemTypeComponent }
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
    QualityModule,
    SubcodeModule,
    BoMModule,
    RoutingModule
  ]
})
export class ItemTypeModule { }
