import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material';

import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { DataService } from 'app/services/data/data.service';

@Component({
    selector     : 'main-form-view',
    templateUrl  : './main.form.component.html',
    styleUrls    : ['./main.form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MainFormViewComponent implements OnInit, OnDestroy
{
    record: any;
    pageType: string;
    formGroup: FormGroup;
    backUrl: string;
    context: any;
    
    @Input()
    public appRoot = '/';

    public structureName: string;
    
    config: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private dataService: DataService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private activatedRoute: ActivatedRoute
    )
    {
        this._unsubscribeAll = new Subject();

        activatedRoute.data.subscribe(data => {
            console.log('activatedRoute.data record', data);
            const context = data.context;
            
            console.log('activatedRoute.data context', context);
            
            this.config = context.config.form;
            this.pageType = context.mode;
            this.record = context.record;
            this.structureName = context.name;
            this.context = context;

            this.backUrl = this.appRoot + this.structureName + '/table';

            console.log('backUrl', this.backUrl);

            this.config.tabs.forEach(tab => tab.controls.forEach(control => {
                if (control.columns) {
                    control.displayedColumns = control.columns.map(col => col.name);
                }
            }));

            this.formGroup = this.createForm();
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createForm(): FormGroup {
        console.log('this.config', this.config);

        const formControls = {};

        try {
            this.config.tabs.forEach(tab => tab.controls.forEach(control => {
                console.log(`name: ${control.name}, value: ${this.record[control.name]}`);
    
                formControls[control.name] = this.record[control.name];
            }));
    
            console.log('formControls', formControls);
        } catch (err) {
            console.log(err);
        }

        return this._formBuilder.group(formControls);
    }

    saveRecord(): void {
        const data = this.formGroup.getRawValue();

        this.dataService.saveRecord(this.context, data).subscribe(resp => {
        });
    }

    addRecord(): void {
        const data = this.formGroup.getRawValue();

        this.dataService.addRecord(this.context, data).subscribe(resp => {
            const url = this.appRoot + this.structureName + '/form/' + resp.identifiers[0].id + '/modify';

            console.log('Navigate to', {url, data, record: this.record});

            this._location.go(url);
        });
    }
}
