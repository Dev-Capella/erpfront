import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionDetailService } from '../services/composition-detail.service';
import { CompositionService } from '../../composition/services/composition.service';

@Component({
  selector: 'app-composition-detail-list',
  templateUrl: './composition-detail-list.component.html',
  styleUrl: './composition-detail-list.component.scss'
})
export class CompositionDetailListComponent extends BaseComponent implements OnInit {
  selectedCompositionDetail: any = null;
  compositionDetailList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private compositionDetailService: CompositionDetailService,
    private compositionService: CompositionService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getCompositionDetailList();
    this.compositionDetailService.isRefreshList$.subscribe(async (result) =>{
      if(result){
        await this.getCompositionDetailList();
        this.compositionDetailService.isRefreshList.next(false);
      }
    });

    this.compositionDetailService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedCompositionDetail = null;
      }
    });
  }

  async getCompositionDetailList(){
    this.showSpinner();
    var itemTypeCode: string = "";
    this.compositionService.selectedData$.subscribe(result=>{
      if(!!result){
        itemTypeCode = result.code;
      }
    })
    this.compositionDetailList = await this.compositionService.getCompositionDetailsByComposition(itemTypeCode,()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.compositionDetailService.keepRight.next(true);
    this.showSpinner();
    var data = await this.compositionDetailService.getCompositionDetailByCode(event.data.code,()=> this.hideSpinner());
    this.compositionDetailService.selectedData.next(data);
  }

  onRowUnselect(){
    this.compositionDetailService.keepRight.next(false);
    this.compositionDetailService.selectedData.next(null);
  }
}
