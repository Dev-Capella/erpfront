import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemTypeService } from '../../services/item-type.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemSubCodeService } from '../../services/item-subcode.service';
import { UserGenericGroupService } from '../../../user-generic-group/services/user-generic-group.service';

@Component({
  selector: 'app-subcode',
  templateUrl: './subcode.component.html',
  styleUrl: './subcode.component.scss'
})
export class SubcodeComponent extends BaseComponent implements OnInit {
  checks: any[] = [
    {code: 'UserGenericGroup', name: 'User Generic Group'}
  ]
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
  groupTypeVisible: boolean = false;
  userGenericGroups: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private itemSubCodeService: ItemSubCodeService,
    private itemTypeService: ItemTypeService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private userGenericGroupService: UserGenericGroupService
    ) {
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
      check: new FormControl(null),
      groupType: new FormControl(null),
    });
    await this.getItemSubCodeList();
  }

  async getItemSubCodeList(){
    this.showSpinner();
    this.subCodeList = await this.itemTypeService.getItemSubCodesByItemType(this.code,()=> this.hideSpinner());
  }

  async getUserGenericGroups(){
    this.showSpinner();
    this.userGenericGroups = await this.userGenericGroupService.getUserGenericGroups(()=> this.hideSpinner());
  }

  new(){
    this.subCodeForm.reset();
    this.subCodeDataDialog = true;
  }

  async changeCheck(event){
    if(event=='UserGenericGroup'){
      this.groupTypeVisible = true;
      await this.getUserGenericGroups();
    }else{
      this.groupTypeVisible = false;
    }
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

  async edit(){
    this.subCodeForm.reset();
    var code = this.selectedItem?.code;
    var result = await this.itemSubCodeService.getItemSubCodeByCode(code,()=> this.hideSpinner());
    this.subCodeForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText:result?.searchText,
      position: result?.position,
      length: result?.length,
      mandatory: result?.mandatory,
      outputSeparator: result?.outputSeparator,
      wareHouseManagement: result?.wareHouseManagement,
      excludedCostManagement: result?.excludedCostManagement,
      type: result?.type,
      itemSubCodeDataType: result?.itemSubCodeDataType,
    })
    this.subCodeDataDialog = true;
  }

  async delete(){
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-subcode',
      header: 'Transaction Confirmation',
      message: 'The subcode is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.itemSubCodeService.deleteItemSubCodeByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Subcode has been removed successfully.'});
        if(this.subCodeDataDialog)
          this.subCodeDataDialog = false;
        await this.getItemSubCodeList();
      }
  });
  }
}
