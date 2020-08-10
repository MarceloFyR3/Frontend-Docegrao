import { Routes } from '@angular/router';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule)
    }
];