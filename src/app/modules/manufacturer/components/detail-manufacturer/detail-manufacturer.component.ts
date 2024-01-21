import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManufacturerService } from '../../services/manufacturer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from '../../../media-manager/services/media.service';
import { MediaCategory } from '../../../../shared/enums/media-category.enum';
import { FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicdialog';
import { GenericMediaListComponent } from '../../../../shared/components/generic-media-list/generic-media-list.component';

@Component({
  selector: 'app-detail-manufacturer',
  templateUrl: './detail-manufacturer.component.html',
  styleUrl: './detail-manufacturer.component.scss'
})
export class DetailManufacturerComponent extends BaseComponent implements OnInit {
  imageUrl: string = "assets/images/no-image.png"
  manufacturerForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  @ViewChild('fileUpload') fileUpload: FileUpload;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private manufacturerService: ManufacturerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private mediaService: MediaService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.manufacturerForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      name: new FormControl(null),
      media: new FormControl(null),
    });
    await this.getManufacturerByCode();
  }

  get formControls() {
    return this.manufacturerForm.controls;
  }

  async getManufacturerByCode() {
    this.showSpinner();
    var result = await this.manufacturerService.getManufacturerByCode(this.code,() => this.hideSpinner());
    this.manufacturerForm.patchValue({
      id: result.id,
      code: result.code,
      shortText: result.shortText,
      longText: result.longText,
      searchText: result.searchText,
      name: result.name,
      media: result.media!= null ? result.media : null,
    })
    if(result.media!=null){
      this.imageUrl = result.media.absolutePath
    }
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
  }

  save(value) {
    if (this.manufacturerForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-manufacturer',
      header: 'Transaction Confirmation',
      message: 'The manufacturer is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          id: value.id,
          code: value.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          name: value?.name,
          media: value.media!=null ? {code: value.media.code} : null,
        }
        this.showSpinner();
        await this.manufacturerService.saveManufacturer(request, () => this.hideSpinner());
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Manufacturer has been saved successfully.' });
        this.router.navigate(['/manufacturer-list'])
      }
    });

  }

  goBack() {
    this.router.navigate(['/manufacturer-list'])
  }

  choose() {
    const ref = this.dialogService.open(GenericMediaListComponent, {
      header: 'Choose a Media',
      styleClass: "w-full md:w-9",
      closeOnEscape: false,
      closable: false,
      data: {
        media: this.manufacturerForm.get('media').value != null ? this.manufacturerForm.get('media').value : null,
        mediaCategory: MediaCategory.MANUFACTURER,
      },
    });
    ref.onClose.subscribe(data => {
      if(data){
        this.imageUrl = data.absolutePath
        this.manufacturerForm.patchValue({
          media: data
        })
      }else{
        this.imageUrl = "assets/images/no-image.png";
        this.manufacturerForm.patchValue({
          media: null
        })
      }
        
    })
  }

  async onSelect(event) {
    if (event.files.length) {
      this.showSpinner();
      await this.mediaService.save(event.files[0], MediaCategory.MANUFACTURER, () => this.hideSpinner());
      this.fileUpload.clear();
      this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Media has been upload successfully.' });
    }
  }
}
