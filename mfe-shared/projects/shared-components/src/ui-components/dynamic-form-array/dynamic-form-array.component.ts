import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dynamic-form-array',
  standalone: true,
  templateUrl: './dynamic-form-array.component.html',
  styleUrls: ['./dynamic-form-array.component.scss'],
})
export class DynamicFormArrayComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      items: this.fb.array([]),
    });
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({ value: [''] }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  submitForm() {
    console.log(this.form.value);
  }
}


