import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemSubCodeService } from '../../../subcode/services/item-sub-code.service';
import { ItemTypeService } from '../../services/item-type.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subcode',
  templateUrl: './subcode.component.html',
  styleUrl: './subcode.component.scss'
})
export class SubcodeComponent extends BaseComponent implements OnInit {
  subCodeList: any[] = []
  code: string;
  subCodeDataDialog: boolean = false;
  subCodeForm: FormGroup;
  types: any[] = [
    {code: 'PRIMARY', name: 'Primary'},
    {code: 'SECONDARY', name: 'Secondary'}
  ]

  dataTypes: any[] = [
    {code: 'ALPHA_NUMERIC', name: 'Alpha numeric'},
    {code: 'ALPHABETIC', name: 'Alphabetic'},
    {code: 'NUMERIC', name: 'Numeric'},
    {code: 'ANYTHING', name: 'Anything'},
  ]
  constructor(spinner: NgxSpinnerService,
    private itemSubCodeService: ItemSubCodeService,
    private itemTypeService: ItemTypeService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }

  async ngOnInit(): Promise<void> {
    this.subCodeForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      position: new FormControl(null),
      length: new FormControl(null),
      mandatory: new FormControl(false),
      outputSeparator: new FormControl(null),
      wareHouseManagement: new FormControl(false),
      excludedCostManagement: new FormControl(false),
      type: new FormControl(null),
      itemSubCodeDataType: new FormControl(null),
    });
    await this.getItemSubCodeList();
  }

  async getItemSubCodeList(){
    this.showSpinner();
    this.subCodeList = await this.itemTypeService.getItemSubCodesByItemType(this.code,()=> this.hideSpinner());
  }

  new(){
    this.subCodeForm.reset();
    this.subCodeDataDialog = true;
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
      mandatory: value?.mandatory,
      outputSeparator: value?.outputSeparator,
      wareHouseManagement: value?.wareHouseManagement,
      excludedCostManagement: value?.excludedCostManagement,
      type: value?.type,
      itemSubCodeDataType: value?.itemSubCodeDataType,
      itemType: {code: this.code }
    }
    this.showSpinner();
    await this.itemSubCodeService.saveItemSubCode(request,()=> this.hideSpinner());
    this.subCodeDataDialog = false;
    this.subCodeForm.reset();
    await this.getItemSubCodeList();
    this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Subcode has been saved successfully.'});
  }

  async delete(){
    // this.showSpinner();
    // await this.itemSubCodeService.deleteItemSubCodeByCode(this.selectedData.code, ()=> this.hideSpinner());
    // this.subCodeDataDialog = false;
    // this.subCodeForm.reset();
    // await this.getItemSubCodeList();
    // this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Subcode has been removed successfully.'});
  }
}
