import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserGenericGroupService } from '../../services/user-generic-group.service';
import { ActivatedRoute } from '@angular/router';
import { UserGenericGroupDetailService } from '../../services/user-generic-group-detail.service';

@Component({
  selector: 'app-user-generic-group-details',
  templateUrl: './user-generic-group-details.component.html',
  styleUrl: './user-generic-group-details.component.scss'
})
export class UserGenericGroupDetailsComponent extends BaseComponent implements OnInit  {
  userGenericGroupDetailList: any[] = []
  code: string;
  userGenericGroupDetailDataDialog: boolean = false;
  userGenericGroupDetailForm: FormGroup;
  selectedItem: any;

  
  constructor(spinner: NgxSpinnerService,
    private userGenericGroupDetailService: UserGenericGroupDetailService,
    private messageService: MessageService,
    private userGenericGroupService: UserGenericGroupService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }

  async ngOnInit(): Promise<void> {
    this.userGenericGroupDetailForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
    await this.getUserGenericGroupDetailList();
  }

  async getUserGenericGroupDetailList(){
    this.showSpinner();
    this.userGenericGroupDetailList = await this.userGenericGroupService.getUserGenericGroupDetailsByUserGenericGroup(this.code,()=> this.hideSpinner());
  }


  new(){
    this.userGenericGroupDetailForm.reset();
    this.userGenericGroupDetailDataDialog = true;
  }

  async onSubmit(value){
    var request = {
      id: value?.id,
      code: value?.code,
      shortText: value?.shortText,
      longText: value?.longText,
      searchText: value?.searchText,
      userGenericGroup: {code: this.code }
    }
    this.showSpinner();
    await this.userGenericGroupDetailService.saveUserGenericGroupDetail(request,()=> this.hideSpinner());
    this.userGenericGroupDetailDataDialog = false;
    this.userGenericGroupDetailForm.reset();
    await this.getUserGenericGroupDetailList();
    this.messageService.add({severity:'success', summary:'Transaction Result', detail:'User generic group detail has been saved successfully.'});
  }

  async edit(){
    this.userGenericGroupDetailForm.reset();
    var code = this.selectedItem?.code;
    var result = await this.userGenericGroupDetailService.getUserGenericGroupDetailByCode(code,()=> this.hideSpinner());
    this.userGenericGroupDetailForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText: result?.searchText,
    })
    this.userGenericGroupDetailDataDialog = true;
  }

  async delete(){
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-user-generic-group-detail',
      header: 'Transaction Confirmation',
      message: 'The user generic group detail is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.userGenericGroupDetailService.deleteUserGenericGroupDetailByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'User generic group detail has been removed successfully.'});
        if(this.userGenericGroupDetailDataDialog)
          this.userGenericGroupDetailDataDialog = false;
        await this.getUserGenericGroupDetailList();
      }
  });
  }
}
