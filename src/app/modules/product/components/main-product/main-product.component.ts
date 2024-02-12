import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { BaseComponent } from '../../../../core/components/base/base.component';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrl: './main-product.component.scss'
})
export class MainProductComponent extends BaseComponent implements OnInit {
  productList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getProductList();
  }

  async getProductList() {
    this.showSpinner();
    this.productList = await this.productService.getProducts(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/product-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-product',
      header: 'Transaction Confirmation',
      message: 'The product is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.productService.deleteProductByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Product has been removed successfully.'});
        await this.getProductList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/product-list/new'])
  }
}
