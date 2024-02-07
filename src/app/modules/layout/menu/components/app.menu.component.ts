import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../../main/app.main.component';
import { MenuService } from '../../../menu/services/menu.service';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent extends BaseComponent implements OnInit {

    model: any[];

    constructor(
        spinner: NgxSpinnerService,
        public app: AppMainComponent,
        private menuService:MenuService) {
            super(spinner)
         }

    async ngOnInit() {
        this.showSpinner();
        this.model = await this.menuService.getCurrentUserMenus(()=>this.hideSpinner())
    }
}
