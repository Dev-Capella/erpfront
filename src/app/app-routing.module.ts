import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './modules/layout/main/app.main.component';

export const routes: Routes = [
    {
        path: '', 
        component: AppMainComponent,
        children: [
            {
                path: 'unit-of-measure-list',
                loadChildren: () => import('../app/modules/unit-of-measure/unit-of-measure.module').then(
                    (m) => m.UnitOfMeasureModule
                )
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
