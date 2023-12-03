import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../../main/app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {label: 'Anasayfa', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'Ana Veri', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                items: [
                    {label: 'UOM', icon: 'pi pi-fw pi-id-card', routerLink: ['/unit-of-measure-list']},
                ]
            },
        ];
    }
}
