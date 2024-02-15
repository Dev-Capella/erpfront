import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { CronJobService } from '../../services/cron-job.service';

@Component({
  selector: 'app-main-cron-job',
  templateUrl: './main-cron-job.component.html',
  styleUrl: './main-cron-job.component.scss'
})
export class MainCronJobComponent extends BaseComponent implements OnInit{
  cronJobList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private cronJobService: CronJobService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getCronJobList();
  }

  async getCronJobList() {
    this.showSpinner();
    this.cronJobList = await this.cronJobService.getCronJobs(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/cron-job-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-cron-job',
      header: 'Transaction Confirmation',
      message: 'The cron job is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.cronJobService.deleteCronJobByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Cron job has been removed successfully.'});
        await this.getCronJobList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/cron-job-list/new'])
  }

  async run(){
    var code = this.selectedItem?.code;
    this.showSpinner();
    await this.cronJobService.runCronJob(code, ()=> this.hideSpinner());
  }
}
