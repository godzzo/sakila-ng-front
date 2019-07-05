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

import { MainFormViewComponent } from './main.form.component';

import { TextEditorComponent } from '../editors/text/text.editor.component';
import { DateEditorComponent } from '../editors/date/date.editor.component';
import { BaseEditorFormComponent } from './base/base.component';
import { MainMatTableModule } from '../mattable/main.mattable.module';


const routes: Routes = [];

@NgModule({
    declarations: [
        MainFormViewComponent,
        TextEditorComponent,
        DateEditorComponent,
        BaseEditorFormComponent
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
        FuseWidgetModule,

        MainMatTableModule
    ],
    exports: [
        MainFormViewComponent,
        TextEditorComponent,
        DateEditorComponent,
        BaseEditorFormComponent
    ],
    providers   : [
    ],
    entryComponents: [
    ]
})
export class MainFormModule
{
}
