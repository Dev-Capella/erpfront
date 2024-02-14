import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-main-counter',
  templateUrl: './main-counter.component.html',
  styleUrl: './main-counter.component.scss'
})
export class MainCounterComponent extends BaseComponent implements OnInit {
  counterList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private counterService: CounterService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getCounterList();
  }

  async getCounterList() {
    this.showSpinner();
    this.counterList = await this.counterService.getCounters(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/counter-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-counter',
      header: 'Transaction Confirmation',
      message: 'The counter is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.counterService.deleteCounterByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Counter has been removed successfully.'});
        await this.getCounterList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/counter-list/new'])
  }
}
