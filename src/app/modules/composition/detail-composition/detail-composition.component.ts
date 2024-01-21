import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionService } from '../services/composition.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-composition',
  templateUrl: './detail-composition.component.html',
  styleUrl: './detail-composition.component.scss'
})
export class DetailCompositionComponent extends BaseComponent implements OnInit {
  compositionForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private compositionService:CompositionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
    
  }
  async ngOnInit(): Promise<void> {
    this.compositionForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      valid: new FormControl(false)
    });

    await this.getCompositionByCode();
  }

  get formControls(){
    return this.compositionForm.controls;
  }

  async getCompositionByCode(){
    this.showSpinner();
    var result = await this.compositionService.getCompositionByCode(this.code, ()=> this.hideSpinner());
    this.compositionForm.setValue(result);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
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
          id: value?.id,
          code: value?.code,
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
