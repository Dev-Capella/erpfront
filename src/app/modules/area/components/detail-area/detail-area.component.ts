import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AreaService } from '../../services/area.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-area',
  templateUrl: './detail-area.component.html',
  styleUrl: './detail-area.component.scss'
})
export class DetailAreaComponent extends BaseComponent implements OnInit {
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
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {
        this.delete();
      }
    },
  ];
  code: string;
  constructor(spinner: NgxSpinnerService,
    private areaService: AreaService,
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
    this.areaForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
    await this.getAreaByCode();
  }

  get formControls() {
    return this.areaForm.controls;
  }

  async getAreaByCode() {
    this.showSpinner();
    var result = await this.areaService.getAreaByCode(this.code, () => this.hideSpinner());
    this.areaForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText: result?.searchText
    })
    this.breadcrumbService.setItems([
      {
        label: 'Area List',
        routerLink: ['/area-list']
      },
      {
        label: this.areaForm?.value?.shortText,
        routerLink: ['/area-list/' + this.code]
      }
    ])
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
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        var result = await this.areaService.saveArea(request, () => this.hideSpinner());
        close ? this.router.navigate(['/area-list/']) : this.getAreaByCode();
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Area has been saved successfully.' });
      }
    });
  }

  async delete() {
    var code = this.code;
    this.confirmationService.confirm({
      key: 'delete-area',
      header: 'Transaction Confirmation',
      message: 'The area is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.areaService.deleteAreaByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Area has been removed successfully.'});
        this.router.navigate(['/area-list/'])
      }
  });
}
}
