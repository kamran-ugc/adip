// calendar.stories.ts
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CalendarComponent } from './calendar.component';
import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';

// Wrapper component to demonstrate usage with a button
const CalendarDemoTemplate = `
<div class="p-4">
  <h2 class="text-xl mb-4">Calendar Popup Demo</h2>
  
  <div class="mb-4">
    <button mat-raised-button color="primary" (click)="calendar.open()">
      {{ selectedDate ? (selectedDate | date) : 'Select a Date' }}
    </button>
  </div>
  
  <app-calendar #calendar 
    [selectedDate]="selectedDate" 
    (dateChange)="onDateChange($event)">
  </app-calendar>
  
  <div class="mt-4" *ngIf="selectedDate">
    <p>Selected date: <strong>{{ selectedDate | date:'fullDate' }}</strong></p>
  </div>
</div>
`;

const meta: Meta<CalendarComponent> = {
    title: 'Components/Calendar',
    component: CalendarComponent,
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                FormsModule,
                BrowserAnimationsModule,
                MatDatepickerModule,
                MatFormFieldModule,
                MatInputModule,
                MatNativeDateModule,
                MatIconModule,
                MatButtonModule
            ],
            declarations: []
        })
    ],
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#f8f9fa' },
                { name: 'dark', value: '#333333' }
            ]
        }
    },
    argTypes: {
        selectedDate: {
            control: 'date',
            description: 'The currently selected date'
        },
        dateChange: { action: 'dateChange' }
    }
};

export default meta;
type Story = StoryObj<CalendarComponent>;

// Story that demonstrates usage with a button
export const WithButtonTrigger: StoryObj<CalendarComponent> = {
    render: (args) => ({
        props: {
            selectedDate: args.selectedDate || null,
            onDateChange: (date: Date) => {
                action('dateChange')(date);
                // Update the selectedDate directly
                args.selectedDate = date;
            }
        },
        template: CalendarDemoTemplate
    }),
    args: {
        selectedDate: null
    }
};

// Story with preselected date
export const WithPreselectedDate: StoryObj<CalendarComponent> = {
    render: (args) => ({
        props: {
            selectedDate: args.selectedDate || new Date(2025, 2, 19),
            onDateChange: (date: Date) => {
                action('dateChange')(date);
                args.selectedDate = date;
            }
        },
        template: CalendarDemoTemplate
    }),
    args: {
        selectedDate: new Date(2025, 2, 19) // March 19, 2025
    }
};

// Story with April 2025 date
export const April2025: StoryObj<CalendarComponent> = {
    render: (args) => ({
        props: {
            selectedDate: args.selectedDate || new Date(2025, 3, 7),
            onDateChange: (date: Date) => {
                action('dateChange')(date);
                args.selectedDate = date;
            }
        },
        template: CalendarDemoTemplate
    }),
    args: {
        selectedDate: new Date(2025, 3, 7) // April 7, 2025
    }
};