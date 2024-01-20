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
import { MainCompositionComponentComponent } from './main-composition-component/main-composition-component.component';
import { NewCompositionComponentComponent } from './new-composition-component/new-composition-component.component';
import { DetailCompositionComponentComponent } from './detail-composition-component/detail-composition-component.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';



@NgModule({
  declarations: [MainCompositionComponentComponent,NewCompositionComponentComponent,DetailCompositionComponentComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCompositionComponentComponent },
      {path:'new',component: NewCompositionComponentComponent},
      {path:':code',component: DetailCompositionComponentComponent}
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
export class CompositionComponentModule { }
