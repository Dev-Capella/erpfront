import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ItemTypeService } from '../../services/item-type.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../routing-item-sub-code/services/routing.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  constructor(spinner: NgxSpinnerService,
    private routingService: RoutingService,
    private messageService: MessageService,
    private itemTypeService: ItemTypeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
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
    await this.routingService.saveRoutingItemSubCode(request,()=> this.hideSpinner());
    this.routingSbcDataDialog = false;
    this.routingSbcForm.reset();
    await this.getRoutingItemSubCodeList();
    this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Routing Sbc has been saved successfully.'});
  }

  async delete(){
    // this.showSpinner();
    // await this.routingService.deleteRoutingItemSubCodeByCode(this.selectedData.code, ()=> this.hideSpinner());
    // this.routingSbcDataDialog = false;
    // this.routingSbcForm.reset();
    // await this.getRoutingItemSubCodeList();
    // this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Routing Sbc has been removed successfully.'});
  }
}
