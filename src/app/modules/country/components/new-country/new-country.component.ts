import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrl: './new-country.component.scss'
})
export class NewCountryComponent extends BaseComponent implements OnInit{
  countryForm: FormGroup;
  items: MenuItem[] = [
    {
      label: 'Back to List',
      icon: 'pi pi-arrow-left',
      styleClass: 'justify-content-center',
      command: () => {
        this.router.navigate(['/country-list'])
      }
    },
    {
      label: 'Save',
      icon: 'pi pi-save',
      styleClass: 'ml-auto',
      command: () => {
        this.save(this.countryForm.value, false)
      }
    },
    {
      label: 'Save And Close',
      icon: 'pi pi-replay',
      command: () => {
        this.save(this.countryForm.value, true);
      }
    },
  ];
  controlBankCheckTypes: any[] = [
    {code: 'MANDATORY', name: 'Mandatory'},
    {code: 'OPTIONAL', name: 'Optional'},
    {code: 'NO', name: 'No'},
    {code: 'USE_BIC_AS_BANK_CODE', name: 'Use BIC as Bank Code'},
  ]
  constructor(spinner: NgxSpinnerService,
    private countryService: CountryService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {

    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Country List',
        routerLink: ['/country-list']
      },
      {
        label: 'New',
        routerLink: ['/country-list/new']
      }
    ])
  }
  async ngOnInit(): Promise<void> {
    this.countryForm = this.formBuilder.group({
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      europeanCommunityMember: new FormControl(false),
      euroCurrency: new FormControl(false),
      iban: new FormControl(false),
      sepa: new FormControl(false),
      controlBankCheckType:new FormControl(null),
      isoCode: new FormControl(null),
      internationalNumericCode: new FormControl(null),
      taxRegistrationNumberLength: new FormControl(null),
      taxStampExcluded: new FormControl(false),
      firstAddressLine: new FormControl(null),
      secondAddressLine: new FormControl(null),
      thirdAddressLine: new FormControl(null),
      fourthAddressLine: new FormControl(null),
      fifthAddressLine: new FormControl(null),
      postalCode: new FormControl(null),
      town: new FormControl(null),
      district: new FormControl(null),
      validateIban: new FormControl(false),
    });

  }

  get formControls() {
    return this.countryForm.controls;
  }

  save(value, close: boolean) {
    if (this.countryForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-country',
      header: 'Transaction Confirmation',
      message: 'The country is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          europeanCommunityMember: value?.europeanCommunityMember,
          euroCurrency: value?.euroCurrency,
          iban: value?.iban,
          sepa: value?.sepa,
          controlBankCheckType:value?.controlBankCheckType,
          isoCode: value?.isoCode,
          internationalNumericCode: value?.internationalNumericCode,
          taxRegistrationNumberLength: value?.taxRegistrationNumberLength,
          taxStampExcluded: value?.taxStampExcluded,
          firstAddressLine: value?.firstAddressLine,
          secondAddressLine: value?.secondAddressLine,
          thirdAddressLine: value?.thirdAddressLine,
          fourthAddressLine: value?.fourthAddressLine,
          fifthAddressLine: value?.fifthAddressLine,
          postalCode: value?.postalCode,
          town: value?.town,
          district: value?.district,
          validateIban: value?.validateIban,
        }
        this.showSpinner();
        var result = await this.countryService.saveCountry(request, () => this.hideSpinner());
        close ? this.router.navigate(['/country-list/']) : this.router.navigate(['/country-list/' + result.code])
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Country has been saved successfully.' });
      }
    });
  }
}
