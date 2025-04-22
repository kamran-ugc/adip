import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from "../shared-components.module";
import { IconComponent } from "../icon/icon.component";

export type ToastSentiment = 'regular' | 'warning' | 'success' | 'error';

@Component({
    selector: 'app-toast',
    imports: [CommonModule, SharedComponentsModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
    @Input() title: string = 'The title goes here';
    @Input() message: string = 'Discover top stocks investors are buying and track market trends.';
    @Input() sentiment: ToastSentiment = 'regular';
    @Input() iconSrc: string | null = null;
    @Output() dismissed = new EventEmitter<void>();

    /**
     * Get the appropriate icon based on sentiment when no custom icon is provided
     */
    get defaultIconSrc(): string {
        switch (this.sentiment) {
            case 'regular':
                return 'edit';
            case 'warning':
                return 'warning';
            case 'success':
                return 'success';
            case 'error':
                return 'error';
            default:
                return 'help';
        }
    }

    /**
     * Get the icon to display (custom or default)
     */
    get displayIconSrc(): string {
        if (this.iconSrc) return this.iconSrc;
        return this.defaultIconSrc;
    }

    /**
     * Dismiss the toast
     */
    onDismiss(): void {
        this.dismissed.emit();
    }
}