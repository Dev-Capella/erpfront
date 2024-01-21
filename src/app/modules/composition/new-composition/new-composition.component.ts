import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionService } from '../services/composition.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-composition',
  templateUrl: './new-composition.component.html',
  styleUrl: './new-composition.component.scss'
})
export class NewCompositionComponent extends BaseComponent implements OnInit {
  compositionForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private compositionService:CompositionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.compositionForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      valid: new FormControl(false)
    });
  }

  get formControls(){
    return this.compositionForm.controls;
  }

  save(value){
    if(this.compositionForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-composition',
      header: 'Transaction Confirmation',
      message: 'The composition is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          valid: value?.valid,
        }
        this.showSpinner();
        await this.compositionService.saveComposition(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Composition has been saved successfully.'});
        this.router.navigate(['/composition-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/composition-list'])
  }
}
