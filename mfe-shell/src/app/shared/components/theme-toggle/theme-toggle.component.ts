import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule
  ],
  template: `
    <button 
      mat-icon-button 
      [matMenuTriggerFor]="themeMenu"
      [matTooltip]="getTooltipText()"
      class="theme-toggle-button">
      <mat-icon>{{ getThemeIcon() }}</mat-icon>
    </button>

    <mat-menu #themeMenu="matMenu" class="theme-menu">
      <button 
        mat-menu-item 
        (click)="setTheme('light')"
        [class.active]="currentTheme === 'light'">
        <mat-icon>light_mode</mat-icon>
        <span>Light</span>
      </button>
      
      <button 
        mat-menu-item 
        (click)="setTheme('dark')"
        [class.active]="currentTheme === 'dark'">
        <mat-icon>dark_mode</mat-icon>
        <span>Dark</span>
      </button>
      
      <button 
        mat-menu-item 
        (click)="setTheme('auto')"
        [class.active]="currentTheme === 'auto'">
        <mat-icon>brightness_auto</mat-icon>
        <span>Auto</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .theme-toggle-button {
      color: var(--gray-70, #8c99b3);
      transition: color 0.3s ease;
      
      &:hover {
        color: var(--primary, #3361ff);
      }
    }

    .theme-menu {
      .mat-mdc-menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        font-size: 14px;
        font-weight: 400;
        color: var(--gray-70, #8c99b3);
        
        &:hover {
          background-color: var(--primary-5p, rgba(51, 97, 255, 0.05));
          color: var(--primary, #3361ff);
          
          mat-icon {
            color: var(--primary, #3361ff);
          }
        }
        
        &.active {
          background-color: var(--primary-5p, rgba(51, 97, 255, 0.05));
          color: var(--primary, #3361ff);
          font-weight: 500;
          
          mat-icon {
            color: var(--primary, #3361ff);
          }
        }
        
        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
          color: var(--gray-70, #8c99b3);
          transition: color 0.2s ease;
        }
        
        span {
          font-size: 14px;
          line-height: 1;
        }
      }
    }
    
    // Dark theme specific styles
    :host-context(.dark-theme) {
      .theme-toggle-button {
        color: var(--gray-70, #4d5e80);
        
        &:hover {
          color: var(--primary, #4d75ff);
        }
      }
      
      .theme-menu .mat-mdc-menu-item {
        color: var(--gray-70, #4d5e80);
        
        &:hover {
          color: var(--primary, #4d75ff);
          
          mat-icon {
            color: var(--primary, #4d75ff);
          }
        }
        
        &.active {
          color: var(--primary, #4d75ff);
          
          mat-icon {
            color: var(--primary, #4d75ff);
          }
        }
        
        mat-icon {
          color: var(--gray-70, #4d5e80);
        }
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  isDarkMode = false;
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
      });

    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.isDarkMode = isDark;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  getThemeIcon(): string {
    switch (this.currentTheme) {
      case 'light':
        return 'light_mode';
      case 'dark':
        return 'dark_mode';
      case 'auto':
        return 'brightness_auto';
      default:
        return 'light_mode';
    }
  }

  getTooltipText(): string {
    switch (this.currentTheme) {
      case 'light':
        return 'Switch to Dark Mode';
      case 'dark':
        return 'Switch to Light Mode';
      case 'auto':
        return 'Using System Theme';
      default:
        return 'Change Theme';
    }
  }
}