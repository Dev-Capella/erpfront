import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { WashSymbolCategoryService } from '../../../wash-symbol-category/services/wash-symbol-category.service';
import { WashSymbolService } from '../../services/wash-symbol.service';

@Component({
  selector: 'app-detail-wash-symbol',
  templateUrl: './detail-wash-symbol.component.html',
  styleUrl: './detail-wash-symbol.component.scss'
})
export class DetailWashSymbolComponent extends BaseComponent implements OnInit {
  washSymbolForm: FormGroup;
  washSymbolCategories: any[] = []
  activeTab: number = 0;
  activeMenu: number = 0;
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private washSymbolService:WashSymbolService,
    private washSymbolCategoryService:WashSymbolCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
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
    await this.getWashSymbolByCode();
  }

  get formControls(){
    return this.washSymbolForm.controls;
  }

  async getWashSymbolCategories(){
    this.showSpinner();
    this.washSymbolCategories = await this.washSymbolCategoryService.getWashSymbolCategories(()=> this.hideSpinner());
  }

  async getWashSymbolByCode(){
    this.showSpinner();
    var result = await this.washSymbolService.getWashSymbolByCode(this.code, ()=> this.hideSpinner());
    this.washSymbolForm.patchValue({
      id: result.id,
      code: result.code,
      shortText: result.shortText,
      longText: result.longText,
      searchText: result.searchText,
      washSymbolCategory: this.washSymbolCategories.find(x=> x.code==result?.washSymbolCategory?.code),
    })
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
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
          id: value?.id,
          code: value?.code,
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
