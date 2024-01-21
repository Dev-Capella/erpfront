import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserGenericGroupService } from '../../services/user-generic-group.service';

@Component({
  selector: 'app-new-user-generic-group',
  templateUrl: './new-user-generic-group.component.html',
  styleUrl: './new-user-generic-group.component.scss'
})
export class NewUserGenericGroupComponent extends BaseComponent implements OnInit {
  userGenericGroupForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;

  types: any[] = [
    { code: 'ALPHA_NUMERIC', name: 'Alpha numeric' },
    { code: 'ALPHABETIC', name: 'Alphabetic' },
    { code: 'NUMERIC', name: 'Numeric' },
    { code: 'ANYTHING', name: 'Anything' },
  ]
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userGenericGroupService: UserGenericGroupService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);

  }
  ngOnInit(): void {
    this.userGenericGroupForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      maxCodeLength: new FormControl(null),
      type: new FormControl(null)
    });
  }

  get formControls() {
    return this.userGenericGroupForm.controls;
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
