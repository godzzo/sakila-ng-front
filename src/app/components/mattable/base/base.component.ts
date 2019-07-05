import { Component, ViewChild, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatPaginator, MatSort } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';

import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from 'app/services/data/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'base-mat-table',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
  })
export class BaseMatTableComponent implements AfterViewInit {
    displayedColumns: string[];
    columns: {caption: string, name: string, type: string}[];
    captions: string[];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    data: any[];

    totalCount = -1;

    entityName: string;
    @Input() appRoot = '/';

    context: any;
    config: any;

    http: HttpClient;

    constructor(
        private dataService: DataService,
        private activatedRoute: ActivatedRoute
    ) {
        console.log(`BaseMatTableComponent constructor >>> ${this.entityName}`);

        activatedRoute.data.subscribe(data => {
            console.log('BaseMatTableComponent >> activatedRoute.data', data);

            this.context = data.context;
            this.entityName = this.context.name;
            this.config = this.context.config.table;

            this.columns = this.config.columns;
            this.displayedColumns = this.config.columns.map(col => col.name);
            
            console.log('BaseMatTableComponent >> activatedRoute.data context', this.context);
        });

        console.log(`BaseMatTableComponent constructor>> displayedColumns: ${this.displayedColumns}`);
    }

    // Azért kell az AfterView mert akkor már a paginator inicializálva van, előtte  csak undefined!
    ngAfterViewInit(): void {
        console.log(`BaseMatTableComponent ngAfterViewInit >>> entityName: ${this.entityName}`);
        console.log(`BaseMatTableComponent ngAfterViewInit >>> displayedColumns: ${this.displayedColumns}`);

        console.log('sort', this.sort);

        // Ha változik a rendezés akkor az első lapora vált
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        // A sorrendváltás és a lap váltás eseményekre egybe iratkozik fel
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                // Elindítja egy üres eseménnyel, hogy lejöjjön az első lap
                startWith({}),

                // Eldobja az összes előző eseményt és csak ezt dobja tovább!
                switchMap(() => {
                    const data = this.getData();

                    console.log(`BaseMatTableComponent >> switchMap : ${typeof (data)}`, data);

                    return data;
                }),
                map(data => { // Az események egyesével jönnek át, itt már a szerverről lekért adat érkezik.
                    console.log(`BaseMatTableComponent >> map : ${typeof (data)}`, data);

                    // Jön az összes találatnak a száma is amit beállítunk a lapozó részére
                    //  vmiért nem kell BehaviorSubject a lapozónak, nem tudom akkor miért és hogyan értesül róla
                    this.totalCount = data.count;

                    // Visszaadjuk a talált elemeket, vagyis a lapon kapott sorokat
                    return data.items;
                }),
                catchError((err) => { // Elkapjuk a hibát, hogy ne okozzon gondot mint nem kezelt aszinkron hiba
                    console.log(err);

                    // Megfigyelhető üres lista megy vissza.
                    return observableOf([]);
                })
            ).subscribe( // Beállítjuk a folyam végén az adatot
                data => {
                    console.log(`BaseMatTableComponent >> subscribe: ${typeof (data)}`, data);

                    this.data = data;
                }
            );
    }

    // Egyszerű adatlekérés, megfigyelhető találati lista megy vissza az összes találat számával
    getData(): Observable<any> {
        return this.dataService.getRecords(this.entityName, this.paginator, this.sort);
    }
}
