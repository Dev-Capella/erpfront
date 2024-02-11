import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { ParameterService } from '../../services/parameter.service';
import { ParameterDataType } from '../../../../shared/enums/parameter-data-type.enum';

@Component({
  selector: 'app-main-parameter',
  templateUrl: './main-parameter.component.html',
  styleUrl: './main-parameter.component.scss'
})
export class MainParameterComponent extends BaseComponent implements OnInit {
  parameterList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private parameterService: ParameterService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getParameterList();
  }

  async getParameterList() {
    this.showSpinner();
    var result = await this.parameterService.getParameters(() => this.hideSpinner());
    this.parameterList = result.map(item => {
      if (item.dataType === ParameterDataType.LOGIC) {
        return { ...item, value: item.value === 'true' };
      }
      return item;
    });
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/parameter-list/', code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-parameter',
      header: 'Transaction Confirmation',
      message: 'The parameter is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.parameterService.deleteParameterByCode(code, () => this.hideSpinner());
        this.messageService.add({ severity: 'success', summary: 'Transaction Result', detail: 'Parameter has been removed successfully.' });
        await this.getParameterList();
      }
    });

  }

  new() {
    this.router.navigate(['/parameter-list/new'])
  }
}
