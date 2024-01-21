import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManufacturerService } from '../../services/manufacturer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MediaService } from '../../../media-manager/services/media.service';
import { MediaCategory } from '../../../../shared/enums/media-category.enum';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-new-manufacturer',
  templateUrl: './new-manufacturer.component.html',
  styleUrl: './new-manufacturer.component.scss'
})
export class NewManufacturerComponent extends BaseComponent implements OnInit {
  manufacturerForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private manufacturerService:ManufacturerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private mediaService: MediaService,
    private router: Router) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.manufacturerForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      name: new FormControl(null),
    });
  }

  get formControls(){
    return this.manufacturerForm.controls;
  }

  save(value){
    if(this.manufacturerForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-manufacturer',
      header: 'Transaction Confirmation',
      message: 'The manufacturer is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          name: value?.name,
        }
        this.showSpinner();
        await this.manufacturerService.saveManufacturer(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Manufacturer has been saved successfully.'});
        this.router.navigate(['/manufacturer-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/manufacturer-list'])
  }

  async onSelect(event){
    if(event.files.length){
      this.showSpinner();
      await this.mediaService.save(event.files[0], MediaCategory.MANUFACTURER, ()=> this.hideSpinner());
      this.fileUpload.clear();
      this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Media has been upload successfully.'});
    }
  }
}
