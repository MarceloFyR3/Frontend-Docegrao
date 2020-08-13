import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class BaseService {

    protected options: {
        route: string,
        skipFirstLoad?: boolean,
    };

    protected _subject$: Subject<Array<any>>;
    protected baseUrl: string;

    constructor(protected http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    protected init(options) {
        this.options = options;
        this._subject$ = <Subject<Array<any>>>new Subject();
    }

    protected formUrl(method: string, entity?: any): string {
        let urlParams = '';

        if (entity && entity.id) {
            urlParams = '/' + entity.id;
        }

        // Good place to inject access_token if appropriate
        return this.baseUrl + this.options.route + '/' + method + urlParams;
    }

    // Generic error handler
    protected handleError(error) {
        let err = new ErrorMessage();
        try {
            if (error && error.error.message.length > 0)
                return { message: error.error.message[0] }
            else
                return err

        } catch (erro) {
            return error
        }
    }

    // http.get
    protected get(method: string, entity?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.formUrl(method, entity))
                .subscribe(
                    (data: any) => {
                        this._subject$.next(data);
                        resolve(data);
                    },
                    error => {
                        reject(this.handleError(error));
                    })
        });
    }

    // http.post
    protected post(method, entity: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(this.formUrl(method, entity), entity)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    error => {
                        reject(this.handleError(error));
                    });
        });
    }

    // http.put
    protected put(method: string, entity: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(this.formUrl(method, entity), entity)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    error => {
                        reject(this.handleError(error));
                    });
        });
    }

    // http.delete
    protected delete(method: string, entity: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(this.formUrl(method, entity)).subscribe(
                data => {
                    resolve(data);
                },
                error => {
                    reject(this.handleError(error));
                });
        });
    }
}

export class ErrorMessage {
    message?: string;
}