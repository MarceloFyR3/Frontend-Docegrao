import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


/* Modules */

/* Components */
import * as authComponents from './components';

/* Containers */
import * as authContainers from '../auth/containers';
import { AuthRoutingModule } from './auth.route';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AuthRoutingModule
    ],
    providers: [],
    declarations: [...authContainers.containers, ...authComponents.components],
    exports: [...authContainers.containers, ...authComponents.components],
})
export class AuthModule { }