import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItemTypeService } from '../../services/item-type.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RoutingSubcodeService } from '../../services/routing-subcode.service';

@Component({
  selector: 'app-routing-sbc',
  templateUrl: './routing-sbc.component.html',
  styleUrl: './routing-sbc.component.scss'
})
export class RoutingSbcComponent extends BaseComponent implements OnInit {
  routingSbcList: any[] = []
  code: string;
  routingSbcDataDialog: boolean = false;
  routingSbcForm: FormGroup;
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private routingSubcodeService: RoutingSubcodeService,
    private messageService: MessageService,
    private itemTypeService: ItemTypeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }

  async ngOnInit(): Promise<void> {
    this.routingSbcForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      position: new FormControl(null),
      length: new FormControl(null),
      outputSeparator: new FormControl(null)
    });
    await this.getRoutingItemSubCodeList();
  }

  async getRoutingItemSubCodeList(){
    this.showSpinner();
    this.routingSbcList = await this.itemTypeService.getRoutingItemSubCodeByItemType(this.code,()=> this.hideSpinner());
  }

  new(){
    this.routingSbcForm.reset();
    this.routingSbcDataDialog = true;
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
    await this.routingSubcodeService.saveRoutingItemSubCode(request,()=> this.hideSpinner());
    this.routingSbcDataDialog = false;
    this.routingSbcForm.reset();
    await this.getRoutingItemSubCodeList();
    this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Routing Sbc has been saved successfully.'});
  }

  async edit(){
    this.routingSbcForm.reset();
    var code = this.selectedItem?.code;
    var result = await this.routingSubcodeService.getRoutingItemSubCodeByCode(code,()=> this.hideSpinner());
    this.routingSbcForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText:result?.searchText,
      position: result?.position,
      length: result?.length,
      outputSeparator: result?.outputSeparator
    })
    this.routingSbcDataDialog = true;
  }

  async delete(){
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-routing-sbc',
      header: 'Transaction Confirmation',
      message: 'The Routing Subode is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.routingSubcodeService.deleteRoutingItemSubCodeByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Routing Subode has been removed successfully.'});
        if(this.routingSbcDataDialog)
          this.routingSbcDataDialog = false;
        await this.getRoutingItemSubCodeList();
      }
  });
  }
}
