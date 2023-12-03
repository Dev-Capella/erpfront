import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './layout/main/app.main.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', component: AppMainComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
