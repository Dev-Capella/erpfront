import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserGenericGroupService } from '../../services/user-generic-group.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-user-generic-group',
  templateUrl: './detail-user-generic-group.component.html',
  styleUrl: './detail-user-generic-group.component.scss'
})
export class DetailUserGenericGroupComponent extends BaseComponent implements OnInit {
  userGenericGroupForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;

  types: any[] = [
    { code: 'ALPHA_NUMERIC', name: 'Alpha numeric' },
    { code: 'ALPHABETIC', name: 'Alphabetic' },
    { code: 'NUMERIC', name: 'Numeric' },
    { code: 'ANYTHING', name: 'Anything' },
  ]
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userGenericGroupService: UserGenericGroupService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.userGenericGroupForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      maxCodeLength: new FormControl(null),
      type: new FormControl(null)
    });

    await this.getUserGenericGroupByCode();
  }

  get formControls() {
    return this.userGenericGroupForm.controls;
  }

  async getUserGenericGroupByCode(){
    this.showSpinner();
    var result = await this.userGenericGroupService.getUserGenericGroupByCode(this.code, ()=> this.hideSpinner());
    this.userGenericGroupForm.setValue(result);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
  }

  save(value) {
    if (this.userGenericGroupForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-user-generic-group',
      header: 'Transaction Confirmation',
      message: 'The user generic group is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          maxCodeLength: value?.maxCodeLength,
          type: value?.type
        }
        this.showSpinner();
        await this.userGenericGroupService.saveUserGenericGroup(request, () => this.hideSpinner());
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'User generic group has been saved successfully.' });
        this.router.navigate(['/user-generic-group-list'])
      }
    });

  }

  goBack() {
    this.router.navigate(['/user-generic-group-list'])
  }
}
