import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMediaManagerComponent } from './components/main-media-manager/main-media-manager.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MainMediaManagerComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainMediaManagerComponent }
    ]),
    CommonModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    ReactiveFormsModule,
  ]
})
export class MediaManagerModule { }
