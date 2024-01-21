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
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import {SidebarModule} from 'primeng/sidebar';
import { MainCompositionComponent } from './main-composition/main-composition.component';
import { NewCompositionComponent } from './new-composition/new-composition.component';
import { DetailCompositionComponent } from './detail-composition/detail-composition.component';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CompositionDetailsComponent } from './composition-details/composition-details.component';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [MainCompositionComponent, NewCompositionComponent,DetailCompositionComponent, CompositionDetailsComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCompositionComponent },
      {path:'new',component: NewCompositionComponent},
      {path:':code',component: DetailCompositionComponent}
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
    CheckboxModule,
    DialogModule,
    InputNumberModule
  ]
})
export class CompositionModule { }
