import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SubSeriesService } from '../../services/sub-series.service';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-sub-series',
  templateUrl: './sub-series.component.html',
  styleUrl: './sub-series.component.scss'
})
export class SubSeriesComponent extends BaseComponent implements OnInit {
  subSeriesList: any[] = []
  code: string;
  subSeriesDataDialog: boolean = false;
  subSeriesForm: FormGroup;
 
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private subSeriesService: SubSeriesService,
    private counterService: CounterService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    ) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }

  async ngOnInit(): Promise<void> {
    this.subSeriesForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      lastUsedNumber: new FormControl(null),
    });
    await this.getSubseriesList();
  }

  async getSubseriesList(){
    this.showSpinner();
    this.subSeriesList = await this.counterService.getSubSeriesByCounter(this.code,()=> this.hideSpinner());
  }

  new(){
    this.subSeriesForm.reset();
    this.subSeriesDataDialog = true;
  }

  async onSubmit(value){
    var request = {
      id: value?.id,
      code: value?.code,
      shortText: value?.shortText,
      longText: value?.longText,
      searchText:value?.searchText,
      lastUsedNumber: value?.lastUsedNumber,
      counter: {code: this.code },
    }
    this.showSpinner();
    await this.subSeriesService.saveSubSeries(request,()=> this.hideSpinner());
    this.subSeriesDataDialog = false;
    this.subSeriesForm.reset();
    await this.getSubseriesList();
    this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Subseries has been saved successfully.'});
  }

  async edit(){
    this.subSeriesForm.reset();
    var code = this.selectedItem?.code;
    var result = await this.subSeriesService.getSubSeriesByCode(code,()=> this.hideSpinner());
    this.subSeriesForm.patchValue({
      id: result?.id,
      code: result?.code,
      shortText: result?.shortText,
      longText: result?.longText,
      searchText:result?.searchText,
      lastUsedNumber: result?.lastUsedNumber,
    })
    this.subSeriesDataDialog = true;
  }

  async delete(){
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-sub-series',
      header: 'Transaction Confirmation',
      message: 'The subseries is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.subSeriesService.deleteSubSeriesByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Subseries has been removed successfully.'});
        if(this.subSeriesDataDialog)
          this.subSeriesDataDialog = false;
        await this.getSubseriesList();
      }
  });
  }
}
