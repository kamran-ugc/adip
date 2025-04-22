import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';

import { NotificationContainerComponent } from './toast-container.component';
import { ToastComponent } from './toast.component';
import { NotificationBannerComponent } from '../notification-banner/notification-banner.component';
import { NotificationService } from './toast.service';

/**
 * Demo component for showcasing the Notification Service functionality.
 * This component provides an interactive UI to demonstrate different notification types
 * including both toast and banner styles.
 * 
 * @example
 * <app-notification-demo></app-notification-demo>
 */
@Component({
  selector: 'app-notification-demo',
  template: `
    <div style="padding: 20px; max-width: 800px;">
      <h2>Notification Service Demo</h2>
      <p>This demo shows how to use the NotificationService to display different types of notifications.</p>
      
      <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 20px;">
        <div>
          <h3>Toast Style Notifications</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
            <button 
              (click)="showRegularToast()" 
              style="padding: 8px 16px; background-color: #1E417C; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Regular Toast
            </button>
            
            <button 
              (click)="showWarningToast()" 
              style="padding: 8px 16px; background-color: #A05A00; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Warning Toast
            </button>
            
            <button 
              (click)="showSuccessToast()" 
              style="padding: 8px 16px; background-color: #1B5E20; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Success Toast
            </button>
            
            <button 
              (click)="showErrorToast()" 
              style="padding: 8px 16px; background-color: #B71C1C; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Error Toast
            </button>
          </div>
        </div>
        
        <div>
          <h3>Banner Style Notifications</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
            <button 
              (click)="showInfoBanner()" 
              style="padding: 8px 16px; background-color: #1E417C; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Info Banner
            </button>
            
            <button 
              (click)="showWarningBanner()" 
              style="padding: 8px 16px; background-color: #A05A00; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Warning Banner
            </button>
            
            <button 
              (click)="showSuccessBanner()" 
              style="padding: 8px 16px; background-color: #1B5E20; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Success Banner
            </button>
            
            <button 
              (click)="showNoteBanner()" 
              style="padding: 8px 16px; background-color: #B71C1C; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Note Banner
            </button>
          </div>
          
        </div>
        
        <div>
          <h3>Settings</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center; margin-bottom: 10px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">Auto-dismiss Duration (ms):</label>
              <input 
                type="number" 
                [(ngModel)]="duration" 
                style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;" />
              <p style="margin-top: 4px; color: #666; font-size: 14px;">Set to 0 for no auto-dismiss</p>
            </div>
            
            <button 
              (click)="dismissAll()" 
              style="padding: 8px 16px; background-color: #616161; color: white; border: none; border-radius: 4px; cursor: pointer; align-self: flex-start; margin-top: 24px;">
              Dismiss All
            </button>
          </div>
        </div>
      </div>
      
      <app-toast-container></app-toast-container>
    </div>
  `,
  imports: [CommonModule, FormsModule, NotificationContainerComponent],
  standalone: true,
})
export class NotificationDemoComponent {
  duration: number = 5000;
  smallSize: boolean = false;
  dismissable: boolean = false;

  constructor(private notificationService: NotificationService) { }

  // Toast style notifications
  showRegularToast(): void {
    this.notificationService.showRegular(
      'Information',
      'Discover top stocks investors are buying and track market trends.',
      { duration: this.duration }
    );
    action('Regular toast shown')();
  }

  showWarningToast(): void {
    this.notificationService.showWarning(
      'Warning',
      'Discover top stocks investors are buying and track market trends.',
      { duration: this.duration }
    );
    action('Warning toast shown')();
  }

  showSuccessToast(): void {
    this.notificationService.showSuccess(
      'Success',
      'Discover top stocks investors are buying and track market trends.',
      { duration: this.duration }
    );
    action('Success toast shown')();
  }

  showErrorToast(): void {
    this.notificationService.showError(
      'Error',
      'Discover top stocks investors are buying and track market trends.',
      { duration: this.duration }
    );
    action('Error toast shown')();
  }

  // Banner style notifications
  showInfoBanner(): void {
    this.notificationService.showInfoBanner(
      'By confirming, the changes will reflect on your risk profile.',
      {
        dismissable: this.dismissable,
        duration: this.duration,
      }
    );
    action('Info banner shown')();
  }

  showWarningBanner(): void {
    this.notificationService.showWarningBanner(
      'By confirming, the changes will reflect on your risk profile.',
      {
        dismissable: this.dismissable,
        duration: this.duration,
      }
    );
    action('Warning banner shown')();
  }

  showSuccessBanner(): void {
    this.notificationService.showSuccessBanner(
      'By confirming, the changes will reflect on your risk profile.',
      {
        dismissable: this.dismissable,
        duration: this.duration,
      }
    );
    action('Success banner shown')();
  }

  /**
   * Show a note banner notification
   *
   * Example:
   * showNoteBanner()
   *
   * @param message The message to be displayed in the banner
   * @param options Notification options:
   *   - size: The size of the banner, either 'small' or 'regular'
   *   - dismissable: Whether to show a dismiss button
   *   - duration: Auto-dismiss duration in ms
   */
  showNoteBanner(): void {
    this.notificationService.showNoteBanner(
      'By confirming, the changes will reflect on your risk profile.',
      {
        dismissable: this.dismissable,
        duration: this.duration,
      }
    );
    action('Note banner shown')();
  }

  dismissAll(): void {
    this.notificationService.dismissAll();
    action('All notifications dismissed')();
  }
}

/**
 * Notification Service Demo Storybook Configuration
 */
const meta: Meta<NotificationDemoComponent> = {
  title: 'Components/Notification/NotificationService',
  component: NotificationDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        NotificationContainerComponent,
        ToastComponent,
        NotificationBannerComponent,
        NotificationDemoComponent
      ],
      providers: [NotificationService],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule)
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# Notification Service

The Notification Service provides a unified way to display both toast notifications and banner notifications in your application.

## Basic Usage

\`\`\`typescript
import { Component } from '@angular/core';
import { NotificationService } from './path-to/notification.service';

@Component({
  selector: 'app-example',
  template: '<button (click)="showNotification()">Show Notification</button>'
})
export class ExampleComponent {
  constructor(private notificationService: NotificationService) {}

  // Show a toast notification
  showToast(): void {
    this.notificationService.showSuccess('Success', 'Operation completed successfully!');
  }

  // Show a banner notification
  showBanner(): void {
    this.notificationService.showInfoBanner('Changes will be applied to your account.');
  }
}
\`\`\`

## Setup

1. Add the \`NotificationContainerComponent\` to your app component:

\`\`\`html
<!-- app.component.html -->
<app-notification-container></app-notification-container>
\`\`\`

2. Inject the \`NotificationService\` wherever needed.

## Available Methods

### Toast Style Notifications
- \`showRegular(title, message, options?)\`: Shows a regular toast
- \`showWarning(title, message, options?)\`: Shows a warning toast
- \`showSuccess(title, message, options?)\`: Shows a success toast
- \`showError(title, message, options?)\`: Shows an error toast

### Banner Style Notifications
- \`showInfoBanner(message, options?)\`: Shows an info banner
- \`showWarningBanner(message, options?)\`: Shows a warning banner
- \`showSuccessBanner(message, options?)\`: Shows a success banner
- \`showNoteBanner(message, options?)\`: Shows a note banner

### Common Methods
- \`dismiss(id)\`: Dismisses a specific notification
- \`dismissAll()\`: Dismisses all active notifications

## Options

### Toast Options
\`\`\`typescript
interface ToastOptions {
  duration?: number; // Auto-dismiss duration in ms (0 means no auto-dismiss)
  iconSrc?: string;  // Custom icon source URL
}
\`\`\`

### Banner Options
\`\`\`typescript
interface BannerOptions {
  size?: 'small' | 'regular';  // Size of the banner
  dismissable?: boolean;       // Whether to show a dismiss button
  duration?: number;           // Auto-dismiss duration in ms
}
\`\`\`
        `,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<NotificationDemoComponent>;

export const ServiceDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: `
## Interactive Notification Service Demo

This demo allows you to:

1. Display different types of notifications:
   - Toast style (Regular, Warning, Success, Error)
   - Banner style (Info, Warning, Success, Note)
2. Customize the banner options:
   - Small/Regular size
   - With/without dismiss button
3. Set auto-dismiss duration
4. Manually dismiss all notifications

The unified notification container handles displaying both styles of notifications in the same location.
        `,
      },
    },
  },
};

export const MobileServiceDemo: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: `
## Mobile Notification Experience

This story demonstrates how toast and banner notifications appear on mobile devices.

Key mobile considerations:
- Notifications adapt to smaller screen sizes
- Full-width notifications on very small screens
- Touch-friendly dismiss targets
- Maintained readability at smaller sizes
        `,
      },
    },
  },
};