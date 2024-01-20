import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CompositionComponentService } from '../services/composition-component.service';

@Component({
  selector: 'app-new-composition-component',
  templateUrl: './new-composition-component.component.html',
  styleUrl: './new-composition-component.component.scss'
})
export class NewCompositionComponentComponent extends BaseComponent implements OnInit {
  compositionComponentForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private compositionComponentService:CompositionComponentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.compositionComponentForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
  }

  get formControls(){
    return this.compositionComponentForm.controls;
  }

  save(value){
    if(this.compositionComponentForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-composition-component',
      header: 'Transaction Confirmation',
      message: 'The composition component is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        await this.compositionComponentService.saveCompositionComponent(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Composition Component has been saved successfully.'});
        this.router.navigate(['/composition-component-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/composition-component-list'])
  }
}
