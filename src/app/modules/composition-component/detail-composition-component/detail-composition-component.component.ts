import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionComponentService } from '../services/composition-component.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-composition-component',
  templateUrl: './detail-composition-component.component.html',
  styleUrl: './detail-composition-component.component.scss'
})
export class DetailCompositionComponentComponent extends BaseComponent implements OnInit {
  compositionComponentForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private compositionComponentService:CompositionComponentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.compositionComponentForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
    await this.getCompositionComponentByCode();
  }

  get formControls(){
    return this.compositionComponentForm.controls;
  }

  async getCompositionComponentByCode(){
    this.showSpinner();
    var result = await this.compositionComponentService.getCompositionComponentByCode(this.code, ()=> this.hideSpinner());
    this.compositionComponentForm.setValue(result);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
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
          id: value?.id,
          code: value?.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        await this.compositionComponentService.saveCompositionComponent(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Composition component has been saved successfully.'});
        this.router.navigate(['/composition-component-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/composition-component-list'])
  }
}
