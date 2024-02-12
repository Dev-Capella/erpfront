import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { WashSymbolCategoryService } from '../../services/wash-symbol-category.service';
import { BaseComponent } from '../../../../core/components/base/base.component';


@Component({
  selector: 'app-main-wash-symbol-category',
  templateUrl: './main-wash-symbol-category.component.html',
  styleUrl: './main-wash-symbol-category.component.scss'
})
export class MainWashSymbolCategoryComponent extends BaseComponent implements OnInit {
  washSymbolCategoryList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private washSymbolCategoryService: WashSymbolCategoryService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getWashSymbolCategoryList();
  }

  async getWashSymbolCategoryList() {
    this.showSpinner();
    this.washSymbolCategoryList = await this.washSymbolCategoryService.getWashSymbolCategories(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/wash-symbol-category-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-wash-symbol-category',
      header: 'Transaction Confirmation',
      message: 'The wash symbol category is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.washSymbolCategoryService.deleteWashSymbolCategoryByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Wash symbol category has been removed successfully.'});
        await this.getWashSymbolCategoryList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/wash-symbol-category-list/new'])
  }
}
