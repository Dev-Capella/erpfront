import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemSubCodeService } from '../../services/item-sub-code.service';
import { ItemTypeService } from '../../../item-type/services/item-type.service';

@Component({
  selector: 'app-subcode-list',
  templateUrl: './subcode-list.component.html',
  styleUrl: './subcode-list.component.scss'
})
export class SubcodeListComponent extends BaseComponent implements OnInit {
  selectedItemSubCode: any = null;
  itemSubCodeList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private itemSubCodeService: ItemSubCodeService,
    private itemTypeService: ItemTypeService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getItemSubCodeList();
    this.itemSubCodeService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getItemSubCodeList();
        this.itemSubCodeService.isRefreshList.next(false);
      }
    });

    this.itemSubCodeService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedItemSubCode = null;
      }
    });
  }

  async getItemSubCodeList(){
    this.showSpinner();
    var itemTypeCode: string = "";
    this.itemTypeService.selectedData$.subscribe(result=>{
      if(!!result){
        itemTypeCode = result.code;
      }
    })
    this.itemSubCodeList = await this.itemTypeService.getItemSubCodesByItemType(itemTypeCode,()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.itemSubCodeService.keepRight.next(true);
    this.showSpinner();
    var data = await this.itemSubCodeService.getItemSubCodeByCode(event.data.code,()=>this.hideSpinner());
    this.itemSubCodeService.selectedData.next(data);
  }

  onRowUnselect(){
    this.itemSubCodeService.keepRight.next(false);
    this.itemSubCodeService.selectedData.next(null);
  }
}
