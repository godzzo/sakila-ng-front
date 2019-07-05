import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'date-editor',
  templateUrl: './date.editor.component.html',
  styleUrls: ['./date.editor.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DateEditorComponent implements OnInit {
    @Input() label: string;
    @Input() placeholder: string;
    @Input() name: string;
    @Input() formGroup: FormGroup;
    controlName: string;

	constructor() {
    }

    ngOnInit(): void {
        console.log('DateEditorComponent > ngOnInit > name', this.name);

        this.controlName = this.name + 'DatePicker';
    }
}
