import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

import { ToastComponent } from './toast.component';
import { NotificationBannerComponent } from '../notification-banner/notification-banner.component';
import { NotificationService, NotificationConfig, NotificationEvent, ToastConfig, BannerConfig } from './toast.service';


// Instead of extending the union type, we'll use the union type directly with a required id property
type ActiveNotification = NotificationConfig & { id: string };

@Component({
    selector: 'app-toast-container',
    standalone: true,
    imports: [CommonModule, ToastComponent, NotificationBannerComponent],
    template: `
    <div class="toast-container">
      <ng-container *ngFor="let notification of activeNotifications">
        <!-- Toast style notifications -->
        <app-toast
          *ngIf="isToast(notification)"
          [title]="getToastTitle(notification)"
          [message]="notification.message"
          [sentiment]="getToastSentiment(notification)"
          [iconSrc]="getToastIconSrc(notification)"
          (dismissed)="onDismiss(notification.id)"
          @notificationAnimation
        ></app-toast>
        
        <!-- Banner style notifications -->
        <app-notification-banner
          *ngIf="isBanner(notification)"
          [message]="notification.message" 
          [type]="getBannerType(notification)"
          [dismissable]="getBannerDismissable(notification)"
          (dismissed)="onDismiss(notification.id)"
          @notificationAnimation
        ></app-notification-banner>
      </ng-container>
    </div>
  `,
    styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1050;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 420px;
      width: 100%;
    }

    @media (max-width: 480px) {
      .toast-container {
        top: 10px;
        right: 10px;
        left: 10px;
        width: auto;
      }
    }
  `],
    animations: [
        trigger('notificationAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(-20px)', opacity: 0 }),
                animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 })),
            ]),
        ]),
    ],
})
export class NotificationContainerComponent implements OnInit, OnDestroy {
    activeNotifications: ActiveNotification[] = [];
    private subscription: Subscription = new Subscription();

    constructor(private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.subscription = this.notificationService.events.subscribe((event: NotificationEvent) => {
            this.handleNotificationEvent(event);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /**
     * Type guard to check if notification is a toast
     */
    isToast(notification: NotificationConfig): notification is ToastConfig {
        return notification.style === undefined || notification.style === 'toast';
    }

    /**
     * Type guard to check if notification is a banner
     */
    isBanner(notification: NotificationConfig): notification is BannerConfig {
        return notification.style === 'banner';
    }

    /**
     * Handle notification events from the service
     */
    private handleNotificationEvent(event: NotificationEvent): void {
        if (event.action === 'add' && event.config) {
            this.addNotification(event.config as ActiveNotification);
        } else if (event.action === 'remove') {
            if (event.id === 'all') {
                this.activeNotifications = [];
            } else {
                this.removeNotification(event.id);
            }
        }
    }

    /**
     * Add a new notification to the display list
     */
    private addNotification(notification: ActiveNotification): void {
        // Ensure notification has an ID
        if (!notification.id) {
            notification.id = `notification-${Date.now()}`;
        }

        // Add to the beginning for newer notifications to appear at the top
        this.activeNotifications = [notification, ...this.activeNotifications];

        // Limit number of visible notifications (optional)
        if (this.activeNotifications.length > 5) {
            this.activeNotifications = this.activeNotifications.slice(0, 5);
        }
    }

    /**
     * Remove a notification from the display list
     */
    private removeNotification(id: string): void {
        this.activeNotifications = this.activeNotifications.filter(notification => notification.id !== id);
    }

    /**
     * Handle dismiss event from individual notification component
     */
    onDismiss(id: string): void {
        this.notificationService.dismiss(id);
    }

    /**
     * Helper methods to safely access Toast properties
     */
    getToastTitle(notification: NotificationConfig): string {
        return this.isToast(notification) ? notification.title : '';
    }

    getToastSentiment(notification: NotificationConfig) {
        return this.isToast(notification) ? notification.sentiment : 'regular';
    }

    getToastIconSrc(notification: NotificationConfig): string | null {
        return this.isToast(notification) ? (notification.iconSrc ?? null) : null;
    }

    /**
     * Helper methods to safely access Banner properties
     */
    getBannerType(notification: NotificationConfig) {
        return this.isBanner(notification) ? notification.type : 'info';
    }

    getBannerDismissable(notification: NotificationConfig): boolean {
        return this.isBanner(notification) ? notification.dismissable || false : false;
    }

}