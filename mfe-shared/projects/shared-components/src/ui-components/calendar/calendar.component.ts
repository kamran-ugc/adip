// calendar.component.ts
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatDatepickerModule, MatDatepicker } from "@angular/material/datepicker";
import { MatNativeDateModule, provideNativeDateAdapter } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent {
  @Input() selectedDate: Date | null = null;
  @Output() dateChange = new EventEmitter<Date>();

  @ViewChild('picker') picker!: MatDatepicker<Date>;

  /**
   * Opens the date picker
   */
  open() {
    this.picker.open();
  }

  /**
   * Handles date selection and emits the selected date
   * @param date The selected date
   */
  onDateSelection(date: Date | null) {
    if (date) {
      this.selectedDate = date;
      this.dateChange.emit(date);
      // Close the picker automatically when a date is selected
      this.picker.close();
    }
  }
}