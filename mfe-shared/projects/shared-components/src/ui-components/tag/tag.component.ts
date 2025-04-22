// tag.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TagVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning';

@Component({
    selector: 'app-tag',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent {
    @Input() variant: TagVariant = 'default';
    @Input() text: string = '';
    @Input() rounded: boolean = true;

    get classes(): string {
        const baseClasses = 'inline-flex items-center justify-center font-medium';

        // Variant classes
        const variantClasses = {
            default: 'bg-gray-100 text-gray-800',
            primary: 'bg-blue-100 text-blue-800',
            success: 'bg-green-100 text-green-800',
            danger: 'bg-red-100 text-red-800',
            warning: 'bg-yellow-100 text-yellow-800'
        };

        // Rounded classes
        const roundedClasses = this.rounded ? 'rounded-2xl' : 'rounded-full';
        const paddingClasses = 'padding';

        return `${baseClasses} ${paddingClasses} ${variantClasses[this.variant]} ${roundedClasses}`;
    }
}