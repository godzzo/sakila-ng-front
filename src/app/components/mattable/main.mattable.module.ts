import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatDatepickerModule, MatExpansionModule, 
    MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, 
    MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, 
    MatTableModule, MatTabsModule, MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { MainMatTableComponent } from './main.mattable.component';
import { BaseMatTableComponent } from './base/base.component';
import { SimpleMatTableComponent } from './simple/simple.component';

const routes: Routes = [];

@NgModule({
    declarations: [
        MainMatTableComponent,
        BaseMatTableComponent,
        SimpleMatTableComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    exports: [
        MainMatTableComponent,
        BaseMatTableComponent,
        SimpleMatTableComponent
    ],
    providers   : [
    ],
    entryComponents: [
    ]
})
export class MainMatTableModule
{
}
