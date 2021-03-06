import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'base-editor-form',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseEditorFormComponent implements OnInit {
    @Input() formGroup: FormGroup;
    @Input() config: any;
    @Input() record: any;
    @Input() entityName: string;

    constructor() { }

    ngOnInit() {
    }
}
