import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dynamic-form-group',
  standalone: true,
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss']
})
export class DynamicFormGroupComponent {
  @Input() formGroup!: FormGroup;
}
