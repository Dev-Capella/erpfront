import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { CounterTypeService } from '../../services/counter-type.service';

@Component({
  selector: 'app-main-counter-type',
  templateUrl: './main-counter-type.component.html',
  styleUrl: './main-counter-type.component.scss'
})
export class MainCounterTypeComponent extends BaseComponent implements OnInit {
  counterTypeList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private counterTypeService: CounterTypeService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getCounterTypeList();
  }

  async getCounterTypeList() {
    this.showSpinner();
    this.counterTypeList = await this.counterTypeService.getCounterTypes(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/counter-type-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-counter-type',
      header: 'Transaction Confirmation',
      message: 'The counter type is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.counterTypeService.deleteCounterTypeByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Counter type has been removed successfully.'});
        await this.getCounterTypeList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/counter-type-list/new'])
  }
}
