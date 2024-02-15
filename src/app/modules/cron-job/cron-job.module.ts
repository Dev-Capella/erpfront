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
import { MainCronJobComponent } from './components/main-cron-job/main-cron-job.component';
import { NewCronJobComponent } from './components/new-cron-job/new-cron-job.component';
import { DetailCronJobComponent } from './components/detail-cron-job/detail-cron-job.component';

@NgModule({
  declarations: [MainCronJobComponent, NewCronJobComponent, DetailCronJobComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainCronJobComponent },
      { path: 'new', component: NewCronJobComponent },
      { path: ':code', component: DetailCronJobComponent }
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
export class CronJobModule { }