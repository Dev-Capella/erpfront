import {Component} from '@angular/core';
import { AppMainComponent } from '../main/app.main.component';

@Component({
    selector: 'app-rightpanel',
    templateUrl: './app.rightpanel.component.html',
})
export class AppRightPanelComponent {

    constructor(public app: AppMainComponent) {}
}
