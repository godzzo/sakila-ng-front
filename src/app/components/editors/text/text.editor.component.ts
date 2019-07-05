import { Component, ViewEncapsulation, Input } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'text-editor',
  templateUrl: './text.editor.component.html',
  styleUrls: ['./text.editor.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class TextEditorComponent  {
    @Input() label: string;
    @Input() placeholder: string;
    @Input() name: string;
    @Input() formGroup: FormGroup;

	constructor(
    ) {
    }
}
