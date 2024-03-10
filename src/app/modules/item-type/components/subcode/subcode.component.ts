import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemTypeService } from '../../services/item-type.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemSubCodeService } from '../../services/item-subcode.service';
import { UserGenericGroupService } from '../../../user-generic-group/services/user-generic-group.service';
import { ItemSubCodeCheckTypeService } from '../../../item-sub-code-check-type/services/item-sub-code-check-type.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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
  itemTypeData: any;
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
  itemSubCodeCheckTypes: any[] = []
  pLData: any;
  items: MenuItem[];
  actions: any[] = [{
    label: 'Actions',
    items: [{
         label: 'Detail',
         icon: 'pi pi-refresh',
         command: () => {
             this.edit();
         }
     },
     {
         label: 'Delete',
         icon: 'pi pi-times',
         command: () => {
             this.delete();
         }
     }
     ]},
 ];
  constructor(spinner: NgxSpinnerService,
    private itemSubCodeService: ItemSubCodeService,
    private itemTypeService: ItemTypeService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private userGenericGroupService: UserGenericGroupService,
    private itemSubCodeCheckTypeService: ItemSubCodeCheckTypeService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
    ) {
    super(spinner);
    this.itemTypeData = this.config.data.itemType
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.subCodeForm.reset();
          this.subCodeDataDialog = true;
        }
      },
      {
        label: 'Close',
        styleClass: 'ml-auto',
        icon: 'pi pi-times',
        command: () => {
          this.ref.close();
        }
      },
    ];
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
      itemSubCodeCheckType: new FormControl(null),
      groupTypeCode: new FormControl(null),
    });
    await this.getItemSubCodeCheckTypes();
    await this.getItemSubCodeList();
  }

  async getItemSubCodeList(){
    this.showSpinner();
    this.subCodeList = await this.itemTypeService.getItemSubCodesByItemType(this.itemTypeData?.code,()=> this.hideSpinner());
  }

  async getUserGenericGroups(){
    this.showSpinner();
    this.userGenericGroups = await this.userGenericGroupService.getUserGenericGroups(()=> this.hideSpinner());
  }

  async getItemSubCodeCheckTypes(){
    this.showSpinner();
    this.itemSubCodeCheckTypes = await this.itemSubCodeCheckTypeService.getItemSubCodeCheckTypes(()=> this.hideSpinner());
  }

  new(){
    this.subCodeForm.reset();
    this.groupTypeVisible = false;
    this.subCodeDataDialog = true;
  }

  async changeCheck(event){
    this.showSpinner();
    this.pLData = await this.itemSubCodeCheckTypeService.getItemSubCodeCheckTypeByPolicy(event.code, ()=> this.hideSpinner());
  }

  onRowDblClick(item){
    this.selectedItem = item;
    this.edit();
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
      itemType: {code: this.itemTypeData.code },
      itemSubCodeCheckType: value.itemSubCodeCheckType!=null ? {code: value.itemSubCodeCheckType.code} : null,
      groupTypeCode: value.groupTypeCode!=null ? value.groupTypeCode.code : null,
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
      itemSubCodeCheckType: this.itemSubCodeCheckTypes.find(x=> x.code==result?.itemSubCodeCheckType?.code),
     
    })
    await this.changeCheck(this.itemSubCodeCheckTypes.find(x=> x.code==result?.itemSubCodeCheckType?.code))
    this.subCodeForm.patchValue({
      groupTypeCode: this.pLData.data.find(x=> x.code==result?.groupTypeCode)
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
