import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ConfigService } from '../config/config.service';
import { NotificationService } from '../notification/notification.service';
import { HttpService } from '../http/http.service';

import * as pluralize from "pluralize";

@Injectable({
    providedIn: 'root'
})
export class DataService implements Resolve<any>
{
    routeParams: any;
    onChanged: BehaviorSubject<any>;

    constructor(
        private _httpService: HttpService,
        private _configService: ConfigService,
        private _notificationService: NotificationService
    )
    {
        this.onChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        
        const name = route.url[0].toString();
        const view = route.url[1].toString();
        let mode = 'browse';

        if (view === 'form') {
            mode = this.routeParams.id !== 'new' ? 'edit' : 'new';
        }

        const context: any = {name, view, mode, id: this.routeParams.id};

        console.log('DataService >>> context', context);

        return this._configService.get(name).pipe(
            switchMap(config => {
                context.config = config;

                if (context.mode === 'edit') {
                    return this.getRecord(context).pipe(
                        map(resp => {
                            console.log('resolve >> getRecord', resp);

                            context.record = resp[0];

                            return context;
                        })
                    );
                } else if (context.mode === 'new') {
                    context.record = this.createRecord(context);

                    return of(context);
                } else { // browse
                    return of(context);
                }
            })
        );
    }

    getCount(name: string, resp: any): number {
        return resp.page.totalElements;
    }

    getItems(name: string, resp: any): any[] {
        const pluralName = pluralize.plural(name);

        return resp._embedded[pluralName];
    }

    getUrlRoot(name: string): string {
        const pluralName = pluralize.plural(name);

        return `/api/${pluralName}`;
    }

    getRecord(context: any): Observable<any> {
        if ( context.mode === 'new' ) {
            this.onChanged.next(false);

            return of(false);
        } else {
            const request$ = this._httpService.get(this.getUrlRoot(context.name) + '/get/' + this.routeParams.id);

            request$.pipe(map(response => {
                this.onChanged.next(response[0]);
            }));

            return request$;
        }
    }

    saveRecord(context, record): Observable<any> {
        return this._httpService.patch(this.getUrlRoot(context.name), record).pipe(map(resp => {
            this.onChanged.next({resp, record});

            this._notificationService.notify({action: 'data.saveRecord', data: record, context});

            return resp;
        }));
    }

    addRecord(context, record): Observable<any> {
        return this._httpService.post(this.getUrlRoot(context.name), record).pipe(map(resp => {
            this.onChanged.next({resp, record});

            this._notificationService.notify({action: 'data.addRecord', data: record, context});

            return resp;
        }));
    }

    getRecords(name: string, paginator: {pageIndex: number, pageSize: number}
        , sort: {active: string, direction: string}): Observable<any> {
        
        const skip = paginator.pageIndex * paginator.pageSize;
        const take = paginator.pageSize;

        const [requestUrl, options] = this.prepareGetRecordsRequest(
            name, skip, take, sort.active, sort.direction);

        console.log(requestUrl);

        return this._httpService.get(requestUrl);
    }

    prepareGetRecordsRequest(name: string, skip: number, take: number, order: string, orderDirection: string)
        : [string, any] {
        const requestUrl = this.getUrlRoot(name) 
            + `?page=0&sort=${order},${orderDirection}`;

        return [requestUrl, null];
    }

    createRecord(context: any): any {
        const record = {};

        context.config.form.tabs.forEach(tab => tab.controls.forEach(control => {
            let value: any = '';

            if (control.type == 'number') {
                value = 0;
            } else if (control.type == 'date') {
                value = new Date();
            } else {
                value = null;
            }

            record[control.name] = value;
        }));

        return record;
    }
}
