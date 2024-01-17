import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ItemTypeService } from '../../services/item-type.service';
import { ActivatedRoute } from '@angular/router';
import { BoMService } from '../../../bom/services/bom.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bom-sbc',
  templateUrl: './bom-sbc.component.html',
  styleUrl: './bom-sbc.component.scss'
})
export class BomSbcComponent extends BaseComponent implements OnInit {
  bomSbcList: any[] = []
  code: string;
  bomSbcDataDialog: boolean = false;
  bomSbcForm: FormGroup;
  constructor(spinner: NgxSpinnerService,
    private boMService: BoMService,
    private messageService: MessageService,
    private itemTypeService: ItemTypeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }

  async ngOnInit(): Promise<void> {
    this.bomSbcForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      position: new FormControl(null),
      length: new FormControl(null),
      outputSeparator: new FormControl(null)
    });
    await this.getBoMSbcList();
  }

  async getBoMSbcList(){
    this.showSpinner();
    this.bomSbcList = await this.itemTypeService.getBoMByItemType(this.code,()=> this.hideSpinner());
  }

  new(){
    this.bomSbcDataDialog = true;
  }

  async onSubmit(value){
    var request = {
      id: value?.id,
      code: value?.code,
      shortText: value?.shortText,
      longText: value?.longText,
      searchText:value?.searchText,
      position: value?.position,
      length: value?.length,
      itemType: {code: this.code },
      outputSeparator: value?.outputSeparator
    }
    this.showSpinner();
    await this.boMService.saveBoM(request,()=> this.hideSpinner());
    this.bomSbcDataDialog = false;
    this.bomSbcForm.reset();
    await this.getBoMSbcList();
    this.messageService.add({severity:'success', summary:'Transaction Result', detail:'BoM Sbc has been saved successfully.'});
  }

  async delete(){
    // this.showSpinner();
    // await this.boMService.deleteBoMByCode(this.selectedData.code, ()=> this.hideSpinner());
    // this.bomSbcDataDialog = false;
    // this.bomSbcForm.reset();
    // await this.getBoMSbcList();
    // this.messageService.add({severity:'success', summary:'Transaction Result', detail:'BoM Sbc has been removed successfully.'});
  }
}
