import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { CounterTypeService } from '../../services/counter-type.service';

@Component({
  selector: 'app-detail-counter-type',
  templateUrl: './detail-counter-type.component.html',
  styleUrl: './detail-counter-type.component.scss'
})
export class DetailCounterTypeComponent extends BaseComponent implements OnInit {
  counterTypeForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  subSeriesTypeRequiredList: any[] = [
    { code: 'NO', name: 'No' },
    { code: 'ALL', name: 'All' },
    { code: 'YEAR', name: 'Year' },
    { code: 'ITEM_TYPE', name: 'Item type' },
  ]
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private counterTypeService: CounterTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,) {
    super(spinner);
    this.code = this.route.snapshot.params['code']

  }
  async ngOnInit(): Promise<void> {
    this.counterTypeForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      provisionalCounterAllowed: new FormControl(false),
      defaultCounterAllowed: new FormControl(false),
      counterTypeLength: new FormControl(null),
      subSeriesTypeRequired: new FormControl(null)
    });
    await this.getCounterTypeByCode();
  }

  get formControls() {
    return this.counterTypeForm.controls;
  }

  async getCounterTypeByCode(){
    this.showSpinner();
    var result = await this.counterTypeService.getCounterTypeByCode(this.code, ()=> this.hideSpinner());
    this.counterTypeForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText: result?.searchText,
      provisionalCounterAllowed: result?.provisionalCounterAllowed,
      defaultCounterAllowed: result?.defaultCounterAllowed,
      counterTypeLength: result?.counterTypeLength,
      subSeriesTypeRequired: result?.subSeriesTypeRequired
    })
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
  }

  save(value) {
    if (this.counterTypeForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-counter-type',
      header: 'Transaction Confirmation',
      message: 'The counter type is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          provisionalCounterAllowed:  value?.provisionalCounterAllowed,
          defaultCounterAllowed:  value?.defaultCounterAllowed,
          counterTypeLength:  value?.counterTypeLength,
          subSeriesTypeRequired:  value?.subSeriesTypeRequired
        }
        this.showSpinner();
        await this.counterTypeService.saveCounterType(request, () => this.hideSpinner());
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Counter type has been saved successfully.' });
        this.router.navigate(['/counter-type-list'])
      }
    });

  }

  goBack() {
    this.router.navigate(['/counter-type-list'])
  }
}
