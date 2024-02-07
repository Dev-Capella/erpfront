import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent extends BaseComponent implements OnInit {
  menuList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private menuService: MenuService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getMenusByRoot();
  }

  async getMenusByRoot() {
    this.showSpinner();
    var result = await this.menuService.getMenusByRoot(() => this.hideSpinner());
    this.menuList = result.map(x=> {return {data: {...x}, leaf: false, children: []}})
  }

  async onNodeExpand(event){
    this.showSpinner();
    var result = await this.menuService.getMenuItemsByCode(event?.node?.data?.code, ()=> this.hideSpinner());
    event.node.children = result.map(x=> {return {data: {...x}, leaf: false, children: []}})
    this.menuList = [...this.menuList]
  }

  async edit() {
    var code = this.selectedItem?.data?.code;
    this.router.navigate(['/menu-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.data?.code;
    this.confirmationService.confirm({
      key: 'delete-menu',
      header: 'Transaction Confirmation',
      message: 'The menu is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.menuService.deleteMenuByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Menu has been removed successfully.'});
        await this.getMenusByRoot();
      }
  });
   
  }

  new() {
    this.router.navigate(['/menu-list/new'])
  }

}
