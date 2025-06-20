import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ram-dev-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <div class="dev-container">
      <!-- Development Mode Banner -->
      <mat-toolbar color="warn" class="dev-banner">
        <mat-icon>construction</mat-icon>
        <span class="spacer"></span>
        <span class="dev-title">RAM Development Mode</span>
        <span class="spacer"></span>
        <span class="dev-info">Standalone: Port 4600</span>
      </mat-toolbar>

      <!-- Navigation Bar for Dev -->
      <mat-toolbar color="primary" class="nav-toolbar">
        <span>RAM - Risk Assessment Module</span>
        <span class="spacer"></span>
        <button mat-button routerLink="/project-list" routerLinkActive="active">
          <mat-icon>list</mat-icon>
          Projects
        </button>
        <button mat-button routerLink="/create-project" routerLinkActive="active">
          <mat-icon>add</mat-icon>
          Create Project
        </button>
      </mat-toolbar>

      <!-- Main Content Area -->
      <div class="content-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .dev-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .dev-banner {
      background-color: #ff9800 !important;
      color: white;
      font-weight: bold;
      min-height: 48px;
    }

    .nav-toolbar {
      min-height: 64px;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .dev-title {
      font-size: 16px;
      font-weight: bold;
    }

    .dev-info {
      font-size: 12px;
      opacity: 0.9;
    }

    .content-container {
      flex: 1;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .active {
      background-color: rgba(255,255,255,0.1);
    }

    button[mat-button] {
      margin-left: 8px;
    }
  `]
})
export class RamDevRootComponent {
  title = 'RAM Development Mode';
}