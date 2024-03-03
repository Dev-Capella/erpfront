import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AreaService } from '../../services/area.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-area',
  templateUrl: './new-area.component.html',
  styleUrl: './new-area.component.scss'
})
export class NewAreaComponent extends BaseComponent implements OnInit {
  areaForm: FormGroup;
  items: MenuItem[] = [
    {
      label: 'Back to List',
      icon: 'pi pi-arrow-left',
      styleClass: 'justify-content-center',
      command: () => {
        this.router.navigate(['/area-list'])
      }
    },
    {
      label: 'Save',
      icon: 'pi pi-save',
      styleClass: 'ml-auto',
      command: () => {
        this.save(this.areaForm.value, false)
      }
    },
    {
      label: 'Save And Close',
      icon: 'pi pi-replay',
      command: () => {
        this.save(this.areaForm.value, true);
      }
    },
  ];
  constructor(spinner: NgxSpinnerService,
    private areaService: AreaService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {

    super(spinner);
    this.breadcrumbService.setItems([
      {
        label: 'Area List',
        routerLink: ['/area-list']
      },
      {
        label: 'New',
        routerLink: ['/area-list/new']
      }
    ])
  }
  async ngOnInit(): Promise<void> {
    this.areaForm = this.formBuilder.group({
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });

  }

  get formControls() {
    return this.areaForm.controls;
  }

  save(value, close: boolean) {
    if (this.areaForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      key: 'save-area',
      header: 'Transaction Confirmation',
      message: 'The area is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        var result = await this.areaService.saveArea(request, () => this.hideSpinner());
        close ? this.router.navigate(['/area-list/']) : this.router.navigate(['/area-list/' + result.code])
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Area has been saved successfully.' });
      }
    });
  }
}
