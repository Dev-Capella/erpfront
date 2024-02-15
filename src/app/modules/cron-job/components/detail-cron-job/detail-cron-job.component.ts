import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CronJobService } from '../../services/cron-job.service';

@Component({
  selector: 'app-detail-cron-job',
  templateUrl: './detail-cron-job.component.html',
  styleUrl: './detail-cron-job.component.scss'
})
export class DetailCronJobComponent extends BaseComponent implements OnInit{
  cronJobForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  cronJobStatuses: any[] = [
    {code: 'NEW', name: 'NEW'},
    {code: 'RUNNING', name: 'RUNNING'},
    {code: 'SUCCESSFUL', name: 'SUCCESSFUL'},
    {code: 'FAILED', name: 'FAILED'},
    {code: 'STARTED', name: 'STARTED'},
    {code: 'STOPPED', name: 'STOPPED'}
  ]
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private cronJobService:CronJobService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.cronJobForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      triggerPattern: new FormControl(null),
      status: new FormControl(null)
    });
    await this.getCronJobByCode();
  }

  get formControls(){
    return this.cronJobForm.controls;
  }

  async getCronJobByCode(){
    this.showSpinner();
    var result = await this.cronJobService.getCronJobByCode(this.code, ()=> this.hideSpinner());
    this.cronJobForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText: result?.searchText,
      triggerPattern: result?.triggerPattern,
      status: result?.status,
    })
  }

  save(value){
    if(this.cronJobForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-cron-job',
      header: 'Transaction Confirmation',
      message: 'The cron job is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          triggerPattern: value?.triggerPattern,
          status: value?.status
        }
        this.showSpinner();
        await this.cronJobService.saveCronJob(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Cron job has been saved successfully.'});
        this.router.navigate(['/cron-job-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/cron-job-list'])
  }
}
