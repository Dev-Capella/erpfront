import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ItemTypeService } from '../../services/item-type.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QualityLevelService } from '../../services/quality-level.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrl: './quality.component.scss'
})
export class QualityComponent extends BaseComponent implements OnInit {
  qualityLevelList: any[] = []
  code: string;
  qualityDataDialog: boolean = false;
  qualityForm: FormGroup;
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private qualityLevelService: QualityLevelService,
    private messageService: MessageService,
    private itemTypeService: ItemTypeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }

  async ngOnInit(): Promise<void> {
    this.qualityForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      level: new FormControl(null)
    });
    await this.getQualityLevelList();
  }

  async getQualityLevelList(){
    this.showSpinner();
    this.qualityLevelList = await this.itemTypeService.getQualityLevelsByItemType(this.code,()=> this.hideSpinner());
  }

  new(){
    this.qualityForm.reset();
    this.qualityDataDialog = true;
  }

  async onSubmit(value){
    var request = {
      id: value?.id,
      code: value?.code,
      shortText: value?.shortText,
      longText: value?.longText,
      searchText:value?.searchText,
      level: value?.level,
      itemType: {code: this.code }
    }
    this.showSpinner();
    await this.qualityLevelService.saveQualityLevel(request,()=> this.hideSpinner());
    this.qualityDataDialog = false;
    this.qualityForm.reset();
    await this.getQualityLevelList();
    this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Quality level has been saved successfully.'});
  }

  async edit(){
    this.qualityForm.reset();
    var code = this.selectedItem?.code;
    var result = await this.qualityLevelService.getQualityLevelByCode(code,()=> this.hideSpinner());
    this.qualityForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText:result?.searchText,
      level: result?.level,
    })
    this.qualityDataDialog = true;
  }

  async delete(){
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-quality-level',
      header: 'Transaction Confirmation',
      message: 'The quality level is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.qualityLevelService.deleteQualityLevelByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Quality level has been removed successfully.'});
        if(this.qualityDataDialog)
          this.qualityDataDialog = false;
        await this.getQualityLevelList();
      }
  });
  }
}
