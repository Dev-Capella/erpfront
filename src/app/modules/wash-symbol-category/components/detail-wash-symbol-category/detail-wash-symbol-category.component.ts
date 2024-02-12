import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { WashSymbolCategoryService } from '../../services/wash-symbol-category.service';

@Component({
  selector: 'app-detail-wash-symbol-category',
  templateUrl: './detail-wash-symbol-category.component.html',
  styleUrl: './detail-wash-symbol-category.component.scss'
})
export class DetailWashSymbolCategoryComponent extends BaseComponent implements OnInit {
  washSymbolCategoryForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private washSymbolCategoryService:WashSymbolCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.washSymbolCategoryForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
    });
    await this.getWashSymbolCategoryByCode();
  }

  get formControls(){
    return this.washSymbolCategoryForm.controls;
  }

  async getWashSymbolCategoryByCode(){
    this.showSpinner();
    var result = await this.washSymbolCategoryService.getWashSymbolCategoryByCode(this.code, ()=> this.hideSpinner());
    this.washSymbolCategoryForm.setValue(result);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
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
          id: value?.id,
          code: value?.code,
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
