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
import { MainPolicyCheckComponent } from './components/main-policy-check/main-policy-check.component';
import { NewPolicyCheckComponent } from './components/new-policy-check/new-policy-check.component';
import { DetailPolicyCheckComponent } from './components/detail-policy-check/detail-policy-check.component';

@NgModule({
  declarations: [MainPolicyCheckComponent,NewPolicyCheckComponent,DetailPolicyCheckComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainPolicyCheckComponent },
      { path: 'new', component: NewPolicyCheckComponent },
      { path: ':code', component: DetailPolicyCheckComponent }
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
export class PolicyCheckModule { }
