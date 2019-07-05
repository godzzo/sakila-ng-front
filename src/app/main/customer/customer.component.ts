
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CustomerComponent implements OnInit {

    ngOnInit(): void {
    }
}
