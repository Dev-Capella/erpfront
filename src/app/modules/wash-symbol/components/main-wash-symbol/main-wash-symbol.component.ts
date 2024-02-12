import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { WashSymbolService } from '../../services/wash-symbol.service';

@Component({
  selector: 'app-main-wash-symbol',
  templateUrl: './main-wash-symbol.component.html',
  styleUrl: './main-wash-symbol.component.scss'
})
export class MainWashSymbolComponent extends BaseComponent implements OnInit {
  washSymbolList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private washSymbolService: WashSymbolService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getWashSymbolList();
  }

  async getWashSymbolList() {
    this.showSpinner();
    this.washSymbolList = await this.washSymbolService.getWashSymbols(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/wash-symbol-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-wash-symbol',
      header: 'Transaction Confirmation',
      message: 'The wash symbol is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.washSymbolService.deleteWashSymbolByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Wash symbol has been removed successfully.'});
        await this.getWashSymbolList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/wash-symbol-list/new'])
  }
}
