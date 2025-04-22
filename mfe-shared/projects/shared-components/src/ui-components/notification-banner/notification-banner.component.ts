import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type NotificationType = 'info' | 'warning' | 'success' | 'note' | 'custom';

@Component({
    selector: 'app-notification-banner',
    standalone: true,
    imports: [CommonModule, IconComponent],
    templateUrl: './notification-banner.component.html',
    styleUrls: ['./notification-banner.component.scss']
})
export class NotificationBannerComponent {
    @Input() message: string = 'By confirming, the changes will reflect on your risk profile.';
    @Input() type: NotificationType = 'info';
    @Input() dismissible: boolean = false;
    @Input() customIcon?: string;
    @Input() iconSize = 20;

    // Custom styling inputs
    @Input() customClass?: string;
    @Input() bannerClass?: string;
    @Input() iconClass?: string;
    @Input() messageClass?: string;
    @Input() dismissClass?: string;

    // Custom color inputs - for use with type='custom'
    @Input() backgroundColor?: string;
    @Input() textColor?: string;

    @Output() dismissed = new EventEmitter<void>();

    /**
     * Get default icon name based on notification type
     */
    get defaultIcon(): string {
        switch (this.type) {
            case 'info':
                return 'info';
            case 'warning':
                return 'warning';
            case 'success':
                return 'success';
            case 'note':
                return 'help';
            case 'custom':
                return 'info'; // Default for custom type
            default:
                return 'info';
        }
    }

    /**
     * Get icon name based on type and custom icon setting
     */
    get icon(): string {
        return this.customIcon || this.defaultIcon;
    }

    /**
     * Get combined classes for the banner container
     */
    getBannerClasses(): string {
        const classes = [
            'notification-banner',
            `notification-banner--${this.type}`,
            this.customClass || '',
            this.bannerClass || ''
        ];
        return classes.filter(Boolean).join(' ');
    }

    /**
     * Get combined classes for the icon
     */
    getIconClasses(): string {
        const classes = [
            'notification-banner__icon',
            `notification-banner__icon--${this.type}`,
            this.iconClass || ''
        ];
        return classes.filter(Boolean).join(' ');
    }

    /**
     * Get combined classes for the message
     */
    getMessageClasses(): string {
        const classes = [
            'notification-banner__message',
            this.messageClass || ''
        ];
        return classes.filter(Boolean).join(' ');
    }

    /**
     * Get combined classes for the dismiss button
     */
    getDismissClasses(): string {
        const classes = [
            'notification-banner__dismiss',
            this.dismissClass || ''
        ];
        return classes.filter(Boolean).join(' ');
    }

    /**
     * Get the style object for custom colors (when type is 'custom')
     */
    getCustomStyles(): { [key: string]: string } {
        if (this.type !== 'custom') {
            return {};
        }

        const styles: { [key: string]: string } = {};

        if (this.backgroundColor) {
            styles['background-color'] = this.backgroundColor;
        }

        if (this.textColor) {
            styles['color'] = this.textColor;
        }

        return styles;
    }

    /**
     * Dismiss the notification
     */
    onDismiss(): void {
        this.dismissed.emit();
    }
}