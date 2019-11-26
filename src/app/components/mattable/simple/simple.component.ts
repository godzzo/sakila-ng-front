import { Component, ViewChild, AfterViewInit, Input, ViewEncapsulation, OnInit } from '@angular/core';

import { MatSort } from '@angular/material';

import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { DataService } from 'app/services/data/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'simple-mat-table',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.scss'],
    exportAs: 'simpleMatTable',
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
  })
export class SimpleMatTableComponent implements OnInit, AfterViewInit {
    @Input() columns: {caption: string, name: string, type: string}[];
    @Input() displayedColumns: string[];
    captions: string[];

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    data: any[];

    @Input() entityName: string;
    @Input() parentName: string;
    @Input() parentRecord: any;
    @Input() appRoot = '/';

    context: any;
    config: any;

    constructor(
        private dataService: DataService,
        private activatedRoute: ActivatedRoute
    ) {
        console.log(`SimpleMatTableComponent constructor >>> ...`);

    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        console.log(`BaseMatTableComponent ngAfterViewInit >>> entityName: ${this.entityName}`);
        console.log(`BaseMatTableComponent ngAfterViewInit >>> displayedColumns: ${this.displayedColumns}`);

        console.log('sort', this.sort);

        this.sort.sortChange
            .pipe(
                startWith({}),

                switchMap(() => {
                    const data = this.getData();

                    console.log(`BaseMatTableComponent >> switchMap : ${typeof (data)}`, data);

                    return data;
                }),
                map(data => {
                    console.log(`BaseMatTableComponent >> map : ${typeof (data)}`, data);

                    return this.dataService.getItems(this.entityName, data);
                }),
                catchError((err) => {
                    console.log(err);

                    return observableOf([]);
                })
            ).subscribe(
                data => {
                    console.log(`BaseMatTableComponent >> subscribe: ${typeof (data)}`, data);

                    this.data = data;
                }
            );
    }

    getData(): Observable<any> {
        return this.dataService.getRecords(
            this.entityName, {pageIndex: 0, pageSize: 100}, this.sort, this.parentRecord.id, this.parentName
        );
    }
}
