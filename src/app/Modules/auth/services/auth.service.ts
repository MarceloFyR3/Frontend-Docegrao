import { Injectable } from "@angular/core";
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class    AuthService extends BaseService{
    constructor(protected http: HttpClient){
        super(http);

        const options = {
            route: '/Authentication'
        };

        this.init(options)
    }

    login(username, password) {
        return this.post('authenticate', { login: username, password: password })
    }
}