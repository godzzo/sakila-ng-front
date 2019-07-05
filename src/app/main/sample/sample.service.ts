import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SampleService implements Resolve<any>
{
    routeParams: any;
 
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<any> | Promise<any> | any {
        const getProjects$ = this._httpClient.get('assets/data/projects_2019_25.json');

        const context: any = {};

        return getProjects$.pipe(
            switchMap(projects => {
                context.projects = projects;

                return this._httpClient.get('assets/data/committers_2019_25.json');
            }),
            switchMap(committers => {
                context.committers = committers;
                
                return this._httpClient.get('assets/data/authors_2019_25.json');
            }),
            map(authors => {
                context.authors = authors;

                return context;
            }),
            catchError(error => {
                console.log('HttpService >> get', error); 

                return of([]);
            })
        );
    }
}
