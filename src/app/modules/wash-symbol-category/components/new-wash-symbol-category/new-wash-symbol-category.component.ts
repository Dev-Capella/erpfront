import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { WashSymbolCategoryService } from '../../services/wash-symbol-category.service';

@Component({
  selector: 'app-new-wash-symbol-category',
  templateUrl: './new-wash-symbol-category.component.html',
  styleUrl: './new-wash-symbol-category.component.scss'
})
export class NewWashSymbolCategoryComponent extends BaseComponent implements OnInit {
  washSymbolCategoryForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private washSymbolCategoryService:WashSymbolCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.washSymbolCategoryForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
  }

  get formControls(){
    return this.washSymbolCategoryForm.controls;
  }

  save(value){
    if(this.washSymbolCategoryForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-wash-symbol-category',
      header: 'Transaction Confirmation',
      message: 'The wash symbol category is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
        }
        this.showSpinner();
        await this.washSymbolCategoryService.saveWashSymbolCategory(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Wash symbol category has been saved successfully.'});
        this.router.navigate(['/wash-symbol-category-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/wash-symbol-category-list'])
  }
}
