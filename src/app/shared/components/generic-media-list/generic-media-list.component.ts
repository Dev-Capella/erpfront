import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MediaService } from '../../../modules/media-manager/services/media.service';
import { MediaCategory } from '../../enums/media-category.enum';
import { ByteConversionUtil } from '../../utils/byte-conversion-util';

@Component({
  selector: 'app-generic-media-list',
  templateUrl: './generic-media-list.component.html',
  styleUrl: './generic-media-list.component.scss'
})
export class GenericMediaListComponent extends BaseComponent implements OnInit {
  medias: any[] = []
  selectedItem: any;
  constructor(
    spinner: NgxSpinnerService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private mediaService: MediaService) {
    super(spinner);
    
  }
  async ngOnInit(): Promise<void> {
    await this.getMediasByMediaCategory(this.config?.data?.mediaCategory)
    if(this.config?.data?.media!=null){
      this.selectedItem = this.medias.find(x=> x.code==this.config.data.media.code)
    }
  }

  async getMediasByMediaCategory(mediaCategory){
    this.showSpinner();
    var result = await this.mediaService.getMediasByMediaCategory(mediaCategory, ()=> this.hideSpinner());
    this.medias = result.map(x=> {return {...x, size: ByteConversionUtil.convertBytes(x.size)} });
  }

  save(){
    this.ref.close(this.selectedItem)
  }

  close(){
    this.ref.close();
  }

  download(media){
    window.open(media.absolutePath, '_blank');
  }
}
