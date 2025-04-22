import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dynamic-form-control',
  standalone: true,
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent {
  @Input() label: string = "";
  @Input() control!: FormControl;
  @Input() type: string = "text";
}
