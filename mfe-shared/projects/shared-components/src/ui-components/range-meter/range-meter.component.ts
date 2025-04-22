import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-range-meter',
    templateUrl: './range-meter.component.html',
    styleUrls: ['./range-meter.component.scss']
})
export class RangeMeterComponent implements OnInit {
    @Input() customClass: string = '';
    @Input() min: number = 0;
    @Input() max: number = 100;
    @Input() set value(val: number) {
        // Constrain value between min and max
        this._value = this.constrainValue(val);
        this.calculatePercentage();
    }
    get value(): number {
        return this._value;
    }
    @Input() label: string = '';
    @Input() supportingText: string = '';
    @Input() isCurrency: boolean = true;
    @Input() decimalPlaces: number = 2;

    private _value: number = 0;
    percentage: number = 0;

    ngOnInit() {
        // Initialize with constrained value
        this._value = this.constrainValue(this._value);
        this.calculatePercentage();
    }

    private constrainValue(val: number): number {
        if (val < this.min) return this.min;
        if (val > this.max) return this.max;
        return val;
    }

    private calculatePercentage() {
        const range = this.max - this.min;
        this.percentage = ((this._value - this.min) / range) * 100;
    }

    formatValue(value: number): string {
        if (this.isCurrency) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: this.decimalPlaces,
                maximumFractionDigits: this.decimalPlaces
            }).format(value);
        }
        return value.toFixed(this.decimalPlaces);
    }
} 