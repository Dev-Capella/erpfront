import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItemTypeService } from '../../services/item-type.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BoMSubcodeService } from '../../services/bom-subcode.service';

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
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private boMSubcodeService: BoMSubcodeService,
    private messageService: MessageService,
    private itemTypeService: ItemTypeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
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
    this.bomSbcForm.reset();
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
    await this.boMSubcodeService.saveBoM(request,()=> this.hideSpinner());
    this.bomSbcDataDialog = false;
    this.bomSbcForm.reset();
    await this.getBoMSbcList();
    this.messageService.add({severity:'success', summary:'Transaction Result', detail:'BoM Sbc has been saved successfully.'});
  }

  async edit(){
    this.bomSbcForm.reset();
    var code = this.selectedItem?.code;
    var result = await this.boMSubcodeService.getBoMByCode(code,()=> this.hideSpinner());
    this.bomSbcForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText:result?.searchText,
      position: result?.position,
      length: result?.length,
      outputSeparator: result?.outputSeparator
    })
    this.bomSbcDataDialog = true;
  }

  async delete(){
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-bom-sbc',
      header: 'Transaction Confirmation',
      message: 'The BoM Subode is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.boMSubcodeService.deleteBoMByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'BoM Subode has been removed successfully.'});
        if(this.bomSbcDataDialog)
          this.bomSbcDataDialog = false;
        await this.getBoMSbcList();
      }
  });
  }
}
