import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, 
    MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule, MatTableModule, MatTabsModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { MainMatTableModule } from 'app/components/mattable/main.mattable.module';
import { MainFormModule } from 'app/components/editor-form/main.form.module';

import { ActorsComponent } from './actors/actors.component';
import { ActorComponent } from './actor/actor.component';

import { DataService } from 'app/services/data/data.service';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { StoresComponent } from './stores/stores.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
    {
        path     : 'actor/table',
        component: ActorsComponent,
        resolve  : {
            context: DataService
        }
    },
    {
        path     : 'actor/form/:id/:mode',
        component: ActorComponent,
        resolve  : {
            context: DataService
        }
    },
    {
        path     : 'customer/table',
        component: CustomersComponent,
        resolve  : {
            context: DataService
        }
    },
    {
        path     : 'customer/form/:id/:mode',
        component: CustomerComponent,
        resolve  : {
            context: DataService
        }
    },
    {
        path     : 'store/table',
        component: StoresComponent,
        resolve  : {
            context: DataService
        }
    },
    {
        path     : 'store/form/:id/:mode',
        component: StoreComponent,
        resolve  : {
            context: DataService
        }
    },
];

@NgModule({
    declarations: [
        ActorComponent,
        ActorsComponent,
        CustomerComponent,
        CustomersComponent,
        StoreComponent,
        StoresComponent
    ],
    imports     : [
        RouterModule.forRoot(routes),

        MatButtonModule,
        MatChipsModule,
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

        FuseSharedModule,
        FuseWidgetModule,

        MainMatTableModule,
        MainFormModule
    ],
    providers   : [
    ]
})
export class MainModule
{
}
