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
            {
                path: 'item-type-list',
                loadChildren: () => import('../app/modules/item-type/item-type.module').then(
                    (m) => m.ItemTypeModule
                )
            },
            {
                path: 'cost-category-list',
                loadChildren: () => import('../app/modules/cost-category/cost-category.module').then(
                    (m) => m.CostCategoryModule
                )
            },
            {
                path: 'cost-level-list',
                loadChildren: () => import('../app/modules/cost-level/cost-level.module').then(
                    (m) => m.CostLevelModule
                )
            },
            {
                path: 'composition-component-list',
                loadChildren: () => import('../app/modules/composition-component/composition-component.module').then(
                    (m) => m.CompositionComponentModule
                )
            },
            {
                path: 'composition-list',
                loadChildren: () => import('../app/modules/composition/composition.module').then(
                    (m) => m.CompositionModule
                )
            },
            {
                path: 'user-generic-group-list',
                loadChildren: () => import('../app/modules/user-generic-group/user-generic-group.module').then(
                    (m) => m.UserGenericGroupModule
                )
            },
            {
                path: 'manufacturer-list',
                loadChildren: () => import('../app/modules/manufacturer/manufacturer.module').then(
                    (m) => m.ManufacturerModule
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
