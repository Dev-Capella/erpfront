import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TransportZoneService } from '../../services/transport-zone.service';
import { CountryService } from '../../../country/services/country.service';

@Component({
  selector: 'app-new-transport-zone',
  templateUrl: './new-transport-zone.component.html',
  styleUrl: './new-transport-zone.component.scss'
})
export class NewTransportZoneComponent extends BaseComponent implements OnInit{
  transportZoneForm: FormGroup;
  items: MenuItem[] = [
    {
      label: 'Back to List',
      icon: 'pi pi-arrow-left',
      styleClass: 'justify-content-center',
      command: () => {
        this.router.navigate(['/transport-zone-list'])
      }
    },
    {
      label: 'Save',
      icon: 'pi pi-save',
      styleClass: 'ml-auto',
      command: () => {
        this.save(this.transportZoneForm.value, false)
      }
    },
    {
      label: 'Save And Close',
      icon: 'pi pi-replay',
      command: () => {
        this.save(this.transportZoneForm.value, true);
      }
    },
  ];
  countries: any[] = []
  constructor(spinner: NgxSpinnerService,
    private transportZoneService: TransportZoneService,
    private countryService: CountryService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {

    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Transport Zone List',
        routerLink: ['/transport-zone-list']
      },
      {
        label: 'New',
        routerLink: ['/transport-zone-list/new']
      }
    ])
  }
  async ngOnInit(): Promise<void> {
    this.transportZoneForm = this.formBuilder.group({
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      country: new FormControl(null),
    });
    await this.getCountries();
  }

  get formControls() {
    return this.transportZoneForm.controls;
  }

  async getCountries(){
    this.showSpinner();
    this.countries = await this.countryService.getCountries(()=> this.hideSpinner());
  }

  save(value, close: boolean) {
    if (this.transportZoneForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-transport-zone',
      header: 'Transaction Confirmation',
      message: 'The transport zone is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          country: {code: value.country}
        }
        this.showSpinner();
        var result = await this.transportZoneService.saveTransportZone(request, () => this.hideSpinner());
        close ? this.router.navigate(['/transport-zone-list/']) : this.router.navigate(['/transport-zone-list/' + result.code])
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Transport zone has been saved successfully.' });
      }
    });
  }
}
