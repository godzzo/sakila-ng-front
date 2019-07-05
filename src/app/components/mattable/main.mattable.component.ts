
import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main-mat-table',
  templateUrl: './main.mattable.component.html',
  styleUrls: ['./main.mattable.component.scss'],
  exportAs: 'mainMatTable',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class MainMatTableComponent<T> implements OnInit {
    entityName: string;
    icon: string;
    caption: string;

    context: any;
    config: any;

    @Input() appRoot = '/';

    constructor(
        private activatedRoute: ActivatedRoute
    ) {
        console.log(`MainMatTableComponent constructor >>> ${this.entityName}`);

        activatedRoute.data.subscribe(data => {
            console.log('MainMatTableComponent >> activatedRoute.data', data);

            this.context = data.context;
            this.config = this.context.config.table;

            this.entityName = this.context.name;
            this.caption = this.config.caption;
            this.icon = this.config.icon;
            
            console.log('MainMatTableComponent >> activatedRoute.data context', this.context);
        });
    }
    
    ngOnInit(): void {
        console.log(`MainMatTable ngOnInit>> entityName: ${this.entityName}`);
    }
}
