import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastSentiment } from './toast.component';
import { NotificationType } from '../notification-banner/notification-banner.component';

// Union type for notification style
export type NotificationStyle = 'toast' | 'banner';

// Base notification configuration interface
interface BaseNotificationConfig {
    id?: string;
    message: string;
    duration?: number; // Auto-dismiss duration in ms (0 means no auto-dismiss)
}

// Toast specific configuration
export interface ToastConfig extends BaseNotificationConfig {
    title: string;
    sentiment: ToastSentiment;
    iconSrc?: string;
    style?: 'toast'; // Default style is toast
}

// Banner specific configuration
export interface BannerConfig extends BaseNotificationConfig {
    type: NotificationType;
    dismissable?: boolean;
    style: 'banner'; // Must specify banner style
}

// Combined notification configuration type
export type NotificationConfig = ToastConfig | BannerConfig;

// Notification event interface
export interface NotificationEvent {
    id: string;
    action: 'add' | 'remove';
    config?: NotificationConfig;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationEvents = new Subject<NotificationEvent>();
    private autoCloseTimers: Map<string, any> = new Map();
    private notificationCounter: number = 0;

    /**
     * Observable that emits notification events
     */
    get events(): Observable<NotificationEvent> {
        return this.notificationEvents.asObservable();
    }

    /**
     * Show a notification with the provided configuration
     */
    show(config: NotificationConfig): string {
        const id = config.id || `notification-${this.notificationCounter++}`;
        const finalConfig: NotificationConfig = {
            ...config,
            id,
            duration: config.duration ?? 5000 // Default 5 seconds
        };

        this.notificationEvents.next({
            id,
            action: 'add',
            config: finalConfig
        });

        // Set up auto-dismiss if duration is greater than 0
        if (finalConfig.duration && finalConfig.duration > 0) {
            this.setupAutoDismiss(id, finalConfig.duration);
        }

        return id;
    }

    //
    // Toast style notification methods
    //

    /**
     * Show a regular toast notification
     */
    showRegular(title: string, message: string, options: Partial<ToastConfig> = {}): string {
        return this.show({
            title,
            message,
            sentiment: 'regular',
            style: 'toast',
            ...options
        } as ToastConfig);
    }

    /**
     * Show a warning toast notification
     */
    showWarning(title: string, message: string, options: Partial<ToastConfig> = {}): string {
        return this.show({
            title,
            message,
            sentiment: 'warning',
            style: 'toast',
            ...options
        } as ToastConfig);
    }

    /**
     * Show a success toast notification
     */
    showSuccess(title: string, message: string, options: Partial<ToastConfig> = {}): string {
        return this.show({
            title,
            message,
            sentiment: 'success',
            style: 'toast',
            ...options
        } as ToastConfig);
    }

    /**
     * Show an error toast notification
     */
    showError(title: string, message: string, options: Partial<ToastConfig> = {}): string {
        return this.show({
            title,
            message,
            sentiment: 'error',
            style: 'toast',
            ...options
        } as ToastConfig);
    }

    //
    // Banner style notification methods
    //

    /**
     * Show an info banner notification
     */
    showInfoBanner(message: string, options: Partial<Omit<BannerConfig, 'type' | 'style'>> = {}): string {
        return this.show({
            message,
            type: 'info',
            style: 'banner',
            dismissable: options.dismissable ?? false,
            duration: options.duration,
        } as BannerConfig);
    }

    /**
     * Show a warning banner notification
     */
    showWarningBanner(message: string, options: Partial<Omit<BannerConfig, 'type' | 'style'>> = {}): string {
        return this.show({
            message,
            type: 'warning',
            style: 'banner',
            dismissable: options.dismissable ?? false,
            duration: options.duration,
        } as BannerConfig);
    }

    /**
     * Show a success banner notification
     */
    showSuccessBanner(message: string, options: Partial<Omit<BannerConfig, 'type' | 'style'>> = {}): string {
        return this.show({
            message,
            type: 'success',
            style: 'banner',
            dismissable: options.dismissable ?? false,
            duration: options.duration,
        } as BannerConfig);
    }

    /**
     * Show a note banner notification
     */
    showNoteBanner(message: string, options: Partial<Omit<BannerConfig, 'type' | 'style'>> = {}): string {
        return this.show({
            message,
            type: 'note',
            style: 'banner',
            dismissable: options.dismissable ?? false,
            duration: options.duration,
        } as BannerConfig);
    }

    /**
     * Dismiss a specific notification
     */
    dismiss(id: string): void {
        this.clearAutoDismissTimer(id);
        this.notificationEvents.next({
            id,
            action: 'remove'
        });
    }

    /**
     * Dismiss all notifications
     */
    dismissAll(): void {
        this.notificationEvents.next({
            id: 'all',
            action: 'remove'
        });
        this.clearAllAutoDismissTimers();
    }

    /**
     * Setup auto-dismiss timer for a notification
     */
    private setupAutoDismiss(id: string, duration: number): void {
        this.clearAutoDismissTimer(id);
        const timer = setTimeout(() => {
            this.dismiss(id);
        }, duration);
        this.autoCloseTimers.set(id, timer);
    }

    /**
     * Clear auto-dismiss timer for a notification
     */
    private clearAutoDismissTimer(id: string): void {
        if (this.autoCloseTimers.has(id)) {
            clearTimeout(this.autoCloseTimers.get(id));
            this.autoCloseTimers.delete(id);
        }
    }

    /**
     * Clear all auto-dismiss timers
     */
    private clearAllAutoDismissTimers(): void {
        this.autoCloseTimers.forEach((timer) => clearTimeout(timer));
        this.autoCloseTimers.clear();
    }
}