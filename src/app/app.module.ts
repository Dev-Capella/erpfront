import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { LayoutModule } from "./modules/layout/layout.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { UnitOfMeasureModule } from "./modules/unit-of-measure/unit-of-measure.module";
import { ToastModule } from "primeng/toast";
import { ItemTypeModule } from "./modules/item-type/item-type.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        LayoutModule,
        NgxSpinnerModule,
        UnitOfMeasureModule,
        ToastModule,
        ItemTypeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}