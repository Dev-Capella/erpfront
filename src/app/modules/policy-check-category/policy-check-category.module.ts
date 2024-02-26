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
import { MainPolicyCheckCategoryComponent } from './components/main-policy-check-category/main-policy-check-category.component';
import { NewPolicyCheckCategoryComponent } from './components/new-policy-check-category/new-policy-check-category.component';
import { DetailPolicyCheckCategoryComponent } from './components/detail-policy-check-category/detail-policy-check-category.component';

@NgModule({
  declarations: [MainPolicyCheckCategoryComponent,NewPolicyCheckCategoryComponent,DetailPolicyCheckCategoryComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainPolicyCheckCategoryComponent },
      { path: 'new', component: NewPolicyCheckCategoryComponent },
      { path: ':code', component: DetailPolicyCheckCategoryComponent }
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
export class PolicyCheckCategoryModule { }
