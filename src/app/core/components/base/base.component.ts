import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
    /**
     *
     */
    constructor(private spinner: NgxSpinnerService) {
    }

    showSpinner(){
        this.spinner.show();
    }

    hideSpinner(){
        this.spinner.hide();
    }
}