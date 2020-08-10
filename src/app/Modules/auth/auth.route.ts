import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

/* Containers */
import * as authContainers from './containers';
import { AuthModule } from './auth.module';

const authRouterConfig: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login', },
    {
        path: 'login',
        canActivate: [],
        component: authContainers.LoginComponent,
        data: {
            title: 'Login - Doce Grão'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(authRouterConfig)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }