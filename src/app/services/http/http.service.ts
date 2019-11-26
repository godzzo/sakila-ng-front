import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private _httpClient: HttpClient,
        private _notificationService: NotificationService
    ) {
    }

    get(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<Object> {
        const getRequest$ = this._httpClient.get(url, options);

        console.log('HttpService >> get', {url, options});

        getRequest$.pipe(
            map(resp => resp),
            catchError(error => {
                console.log('HttpService >> get', error); 

                this._notificationService.notify({
                    action: 'http.get', url, options, error});

                return of([]);
            })
        );

        return getRequest$;
    }

    post(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<Object> {
        const request$ = this._httpClient.post(url, body, options);

        console.log('HttpService >> post', {url, body, options});

        request$.pipe(
            map(resp => resp),
            catchError(error => {
                console.log('HttpService >> post', error); 

                this._notificationService.notify({
                    action: 'http.post', url, body, options, error});

                return of([]);
            })
        );

        return request$;
    }

    patch(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<Object> {
        const request$ = this._httpClient.patch(url, body, options);

        console.log('HttpService >> patch', {url, body, options});

        request$.pipe(
            map(resp => resp),
            catchError(error => {
                console.log('HttpService >> patch', error); 

                this._notificationService.notify({
                    action: 'http.patch', url, body, options, error});

                return of([]);
            })
        );

        return request$;
    }    
}
