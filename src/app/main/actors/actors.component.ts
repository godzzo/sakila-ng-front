
import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { MainMatTableComponent } from 'app/components/mattable/main.mattable.component';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ActorsComponent implements OnInit {
    @ViewChild('mainMatTable', {static: true}) mainMatTable: MainMatTableComponent<Actor>;

    ngOnInit(): void {
    }
}

// {"id":11,"firstName":"ZERO","lastName":"CAGE","lastUpdate":"2006-02-15T03:34:33.000Z"}
export interface Actor {
	id: number;
	firstName: string;
	lastName: string;
	lastUpdate: string;
}
