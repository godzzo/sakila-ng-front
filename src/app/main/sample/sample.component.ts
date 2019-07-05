import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    constructor(
        private activatedRoute: ActivatedRoute
    )
    {
        activatedRoute.data.subscribe(data => {
            console.log('data', data);
        });
    }
}
