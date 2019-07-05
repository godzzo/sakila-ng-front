import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    registry: any = {};

    constructor(
        private _httpService: HttpService
    )
    {
    }

    get(name: string): Observable<any> {
        if (this.registry[name]) {
            return of(this.registry[name]);
        } else {
            return this.request(name)
                .pipe(
                    map(resp => {
                        this.registry[name] = resp;

                        return resp;
                    }),
                    catchError(err => {
                        console.log(err);

                        return of([]);
                    })
                )
            ;
        }
    }

    request(name: string): Observable<any> {
        const [requestUrl, options] = this.prepareRequest(name);

        console.log(requestUrl);

        return this._httpService.get(requestUrl);
    }

    prepareRequest(name: string): [string, any] {
        const requestUrl =
           `/assets/config/${name}.json`;

        return [requestUrl, null];
    }
}
