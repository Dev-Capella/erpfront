import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './modules/layout/main/app.main.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';

export const routes: Routes = [
    {
        path: '', 
        canActivate: [authGuard],
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
            {
                path: 'media-manager',
                loadChildren: () => import('../app/modules/media-manager/media-manager.module').then(
                    (m) => m.MediaManagerModule
                )
            },
            {
                path: 'production-group-list',
                loadChildren: () => import('../app/modules/production-group/production-group.module').then(
                    (m) => m.ProductionGroupModule
                )
            },
            {
                path: 'user-list',
                loadChildren: () => import('../app/modules/user/user.module').then(
                    (m) => m.UserModule
                )
            },
            {
                path: 'user-role-list',
                loadChildren: () => import('../app/modules/user-role/user-role.module').then(
                    (m) => m.UserRoleModule
                )
            },
            {
                path: 'permission-list',
                loadChildren: () => import('../app/modules/permission/permission.module').then(
                    (m) => m.PermissionModule
                )
            },
            {
                path: 'menu-list',
                loadChildren: () => import('../app/modules/menu/menu.module').then(
                    (m) => m.MenuModule
                )
            },
            {
                path: 'item-sub-code-check-type-list',
                loadChildren: () => import('../app/modules/item-sub-code-check-type/item-sub-code-check-type.module').then(
                    (m) => m.ItemSubCodeCheckTypeModule
                )
            },
            {
                path: 'product-list',
                loadChildren: () => import('../app/modules/product/product.module').then(
                    (m) => m.ProductModule
                )
            },
            {
                path: 'user-audit-logs',
                loadChildren: () => import('../app/modules/user-audit/user-audit.module').then(
                    (m) => m.UserAuditModule
                )
            },
            {
                path: 'parameter-list',
                loadChildren: () => import('../app/modules/parameter/parameter.module').then(
                    (m) => m.ParameterModule
                )
            },
            {
                path: 'wash-symbol-category-list',
                loadChildren: () => import('../app/modules/wash-symbol-category/wash-symbol-category.module').then(
                    (m) => m.WashSymbolCategoryModule
                )
            },
            {
                path: 'wash-symbol-list',
                loadChildren: () => import('../app/modules/wash-symbol/wash-symbol.module').then(
                    (m) => m.WashSymbolModule
                )
            },
            {
                path: 'counter-type-list',
                loadChildren: () => import('../app/modules/counter-type/counter-type.module').then(
                    (m) => m.CounterTypeModule
                )
            },
            {
                path: 'counter-list',
                loadChildren: () => import('../app/modules/counter/counter.module').then(
                    (m) => m.CounterModule
                )
            },
            {
                path: 'currency-list',
                loadChildren: () => import('../app/modules/currency/currency.module').then(
                    (m) => m.CurrencyModule
                )
            },
            {
                path: 'cron-job-list',
                loadChildren: () => import('../app/modules/cron-job/cron-job.module').then(
                    (m) => m.CronJobModule
                )
            },
            {
                path: 'policy-check-category-list',
                loadChildren: () => import('../app/modules/policy-check-category/policy-check-category.module').then(
                    (m) => m.PolicyCheckCategoryModule
                )
            },
            {
                path: 'policy-check-list',
                loadChildren: () => import('../app/modules/policy-check/policy-check.module').then(
                    (m) => m.PolicyCheckModule
                )
            }
        ],
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
