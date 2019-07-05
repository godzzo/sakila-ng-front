
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-actors',
  templateUrl: './actor.component.html',
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ActorComponent implements OnInit {

    config: any = {
        tabs: [
            {
                title: 'Basic things',
                controls: [
                    {
                        name: 'id',
                        placeholder: 'Give some identifier :)',
                        label: 'ID',
                        type: 'text'
                    },
                    {
                        name: 'lastUpdate',
                        placeholder: 'Last Update',
                        label: 'Last Update',
                        type: 'date'
                    }
                ]
            },
            {
                title: 'Names',
                controls: [
                    {
                        name: 'firstName',
                        placeholder: 'First Name',
                        label: 'First Name',
                        type: 'text'
                    },
                    {
                        name: 'lastName',
                        placeholder: 'Last Name',
                        label: 'Last Name',
                        type: 'text'
                    }
                ]
            }
        ]
    };

    ngOnInit(): void {
    }
}
