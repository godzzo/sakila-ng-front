
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class StoreComponent implements OnInit {

    ngOnInit(): void {
    }
}
