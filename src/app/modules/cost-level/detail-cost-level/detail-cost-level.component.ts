import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostLevelService } from '../services/cost-level.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-cost-level',
  templateUrl: './detail-cost-level.component.html',
  styleUrl: './detail-cost-level.component.scss'
})
export class DetailCostLevelComponent extends BaseComponent implements OnInit {
  costLevelForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private costLevelService:CostLevelService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.costLevelForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
    await this.getCostLevelByCode();
  }

  get formControls(){
    return this.costLevelForm.controls;
  }

  async getCostLevelByCode(){
    this.showSpinner();
    var result = await this.costLevelService.getCostLevelByCode(this.code, ()=> this.hideSpinner());
    this.costLevelForm.setValue(result);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
  }


  save(value){
    if(this.costLevelForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-uom',
      header: 'Transaction Confirmation',
      message: 'The cost level is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          unitOfMeasureType: value?.unitOfMeasureType
        }
        this.showSpinner();
        await this.costLevelService.saveCostLevel(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Cost level has been saved successfully.'});
        this.router.navigate(['/cost-level-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/cost-level-list'])
  }
}
