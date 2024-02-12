import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { WashSymbolCategoryService } from '../../../wash-symbol-category/services/wash-symbol-category.service';
import { WashSymbolService } from '../../services/wash-symbol.service';

@Component({
  selector: 'app-new-wash-symbol',
  templateUrl: './new-wash-symbol.component.html',
  styleUrl: './new-wash-symbol.component.scss'
})
export class NewWashSymbolComponent extends BaseComponent implements OnInit{
  washSymbolForm: FormGroup;
  washSymbolCategories: any[] = []
  activeTab: number = 0;
  activeMenu: number = 0;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private washSymbolService:WashSymbolService,
    private washSymbolCategoryService:WashSymbolCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  async ngOnInit(): Promise<void> {
    this.washSymbolForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      washSymbolCategory: new FormControl(null),
    });
    await this.getWashSymbolCategories();
  }

  get formControls(){
    return this.washSymbolForm.controls;
  }

  async getWashSymbolCategories(){
    this.showSpinner();
    this.washSymbolCategories = await this.washSymbolCategoryService.getWashSymbolCategories(()=> this.hideSpinner());
  }

  save(value){
    if(this.washSymbolForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-wash-symbol',
      header: 'Transaction Confirmation',
      message: 'The wash symbol is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          washSymbolCategory: value.washSymbolCategory!=null ? {code: value.washSymbolCategory.code} : null
        }
        this.showSpinner();
        await this.washSymbolService.saveWashSymbol(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Wash symbol has been saved successfully.'});
        this.router.navigate(['/wash-symbol-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/wash-symbol-list'])
  }
}
