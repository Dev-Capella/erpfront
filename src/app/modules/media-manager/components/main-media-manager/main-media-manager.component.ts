import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaCategory } from '../../../../shared/enums/media-category.enum';
import { MediaService } from '../../services/media.service';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main-media-manager',
  templateUrl: './main-media-manager.component.html',
  styleUrl: './main-media-manager.component.scss'
})
export class MainMediaManagerComponent extends BaseComponent implements OnInit {
  submitted: boolean = false;
  mediaCategories = Object.values(MediaCategory).map(x => { return { code: x, name: x } });
  displayUploadMedia: boolean = false;
  uploadedFiles: any[] = []
  mediaForm: FormGroup;
  medias: any[] = []

  @ViewChild('fileUpload') fileUpload: FileUpload;
  constructor(
    spinner: NgxSpinnerService,
    private mediaService: MediaService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
    super(spinner)
  }
  async ngOnInit(): Promise<void> {
    this.mediaForm = this.formBuilder.group({
      mediaCategory: new FormControl(null,Validators.required),
    });
    await this.getMediasByMediaCategory();
  }

  get formControls(){
    return this.mediaForm.controls;
  }

  openDialog() {
    this.submitted = false;
    this.displayUploadMedia = true;
    this.fileUpload.clear();
    this.mediaForm.reset();
  }

  onSelect(event) {
    this.uploadedFiles = []
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  async save(){
    this.submitted = true;
    if(this.mediaForm.invalid){
      return;
    }
    if(!this.uploadedFiles.length){
      this.messageService.add({severity:'warn', summary:'Uyarı', detail:'Lütfen dosya seçiniz.'});
      return;
    }
    this.showSpinner();
    await this.mediaService.save(this.uploadedFiles[0], this.mediaForm.value.mediaCategory.code, ()=> this.hideSpinner());
    this.displayUploadMedia = false;
    this.messageService.add({severity:'success', summary:'İşlem Sonucu', detail:'Dosya başarılı bir şekilde yüklenmiştir.'});
    await this.getMediasByMediaCategory();
  }

  async getMediasByMediaCategory(){
    this.showSpinner();
    this.medias = await this.mediaService.getMediasByMediaCategory(MediaCategory.MANUFACTURER, ()=> this.hideSpinner());
  }
}
