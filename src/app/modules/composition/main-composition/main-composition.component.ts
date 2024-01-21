import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FunctionsMenuItemActions } from '../../../shared/enums/functions-menu-item-actions.enum';
import { MenuItemActions } from '../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionService } from '../services/composition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-composition',
  templateUrl: './main-composition.component.html',
  styleUrl: './main-composition.component.scss'
})
export class MainCompositionComponent extends BaseComponent implements OnInit {
  compositionList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private compositionService: CompositionService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getCompositionList();
  }

  async getCompositionList() {
    this.showSpinner();
    this.compositionList = await this.compositionService.getCompositions(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/composition-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-composition',
      header: 'Transaction Confirmation',
      message: 'The composition is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.compositionService.deleteCompositionByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Composition has been removed successfully.'});
        await this.getCompositionList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/composition-list/new'])
  }
}
