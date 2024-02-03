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
                    {label: 'Unit of Measure', icon: 'pi pi-fw pi-id-card', routerLink: ['/unit-of-measure-list']},
                    {label: 'Item Type', icon: 'pi pi-fw pi-id-card', routerLink: ['/item-type-list']},
                    {label: 'Cost Category', icon: 'pi pi-fw pi-id-card', routerLink: ['/cost-category-list']},
                    {label: 'Cost Level', icon: 'pi pi-fw pi-id-card', routerLink: ['/cost-level-list']},
                    {label: 'Composition Component', icon: 'pi pi-fw pi-id-card', routerLink: ['/composition-component-list']},
                    {label: 'Composition', icon: 'pi pi-fw pi-id-card', routerLink: ['/composition-list']},
                    {label: 'User Generic Group', icon: 'pi pi-fw pi-id-card', routerLink: ['/user-generic-group-list']},
                    {label: 'Manufacturer', icon: 'pi pi-fw pi-id-card', routerLink: ['/manufacturer-list']},
                    {label: 'Production Group', icon: 'pi pi-fw pi-id-card', routerLink: ['/production-group-list']},
                    {label: 'User', icon: 'pi pi-fw pi-id-card', routerLink: ['/user-list']},
                    // {label: 'Media Manager', icon: 'pi pi-fw pi-id-card', routerLink: ['/media-manager']},
                ]
            },
        ];
    }
}
