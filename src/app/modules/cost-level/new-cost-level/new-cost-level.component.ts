import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CostLevelService } from '../services/cost-level.service';

@Component({
  selector: 'app-new-cost-level',
  templateUrl: './new-cost-level.component.html',
  styleUrl: './new-cost-level.component.scss'
})
export class NewCostLevelComponent extends BaseComponent implements OnInit {
  costLevelForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private costLevelService:CostLevelService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.costLevelForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
  }

  get formControls(){
    return this.costLevelForm.controls;
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
