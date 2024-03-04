import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TransportZoneService } from '../../services/transport-zone.service';
import { CountryService } from '../../../country/services/country.service';

@Component({
  selector: 'app-detail-transport-zone',
  templateUrl: './detail-transport-zone.component.html',
  styleUrl: './detail-transport-zone.component.scss'
})
export class DetailTransportZoneComponent extends BaseComponent implements OnInit{
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
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {
        this.delete();
      }
    },
  ];
  countries: any[] = []
  code: string;
  constructor(spinner: NgxSpinnerService,
    private transportZoneService: TransportZoneService,
    private countryService: CountryService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
    
  }
  async ngOnInit(): Promise<void> {
    this.transportZoneForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      country: new FormControl(null),
    });
    await this.getCountries();
    await this.getTransportZoneByCode();
  }

  get formControls() {
    return this.transportZoneForm.controls;
  }

  async getCountries(){
    this.showSpinner();
    this.countries = await this.countryService.getCountries(()=> this.hideSpinner());
  }


  async getTransportZoneByCode() {
    this.showSpinner();
    var result = await this.transportZoneService.getTransportZoneByCode(this.code, () => this.hideSpinner());
    this.transportZoneForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText: result?.searchText,
      country: result?.country?.code
    })
    this.breadcrumbService.setItems([
      {
        label: 'Transport Zone List',
        routerLink: ['/transport-zone-list']
      },
      {
        label: this.transportZoneForm?.value?.shortText,
        routerLink: ['/transport-zone-list/' + this.code]
      }
    ])
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
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          country: {code: value.country}
        }
        this.showSpinner();
        var result = await this.transportZoneService.saveTransportZone(request, () => this.hideSpinner());
        close ? this.router.navigate(['/transport-zone-list/']) : this.getTransportZoneByCode();
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Transport zone has been saved successfully.' });
      }
    });
  }

  async delete() {
    var code = this.code;
    this.confirmationService.confirm({
      key: 'delete-transport-zone',
      header: 'Transaction Confirmation',
      message: 'The transport zone is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.transportZoneService.deleteTransportZoneByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Transport zone has been removed successfully.'});
        this.router.navigate(['/transport-zone-list/'])
      }
  });
}
}
