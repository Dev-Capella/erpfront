import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MenuItemActions } from '../../../shared/enums/menu-item-actions.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionComponentService } from '../services/composition-component.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-composition-component',
  templateUrl: './main-composition-component.component.html',
  styleUrl: './main-composition-component.component.scss'
})
export class MainCompositionComponentComponent extends BaseComponent implements OnInit {
  compositionComponentList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private compositionComponentService: CompositionComponentService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getCompositionComponentList();
  }

  async getCompositionComponentList() {
    this.showSpinner();
    this.compositionComponentList = await this.compositionComponentService.getCompositionComponents(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/composition-component-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-composition-component',
      header: 'Transaction Confirmation',
      message: 'The composition component is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.compositionComponentService.deleteCompositionComponentByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Composition component has been removed successfully.'});
        await this.getCompositionComponentList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/composition-component-list/new'])
  }
}
