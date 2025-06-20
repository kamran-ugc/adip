import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-unavailable',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="container-fluid px-4 py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <mat-card class="text-center p-4">
            <mat-card-content>
              <div class="alert alert-danger d-flex align-items-center mb-4" role="alert">
                <mat-icon class="me-2 text-danger">error</mat-icon>
                <div>
                  <h5 class="alert-heading mb-1">Service Unavailable</h5>
                  <p class="mb-0">{{ serviceName }} is currently unavailable. Please ensure that all servers are running.</p>
                </div>
              </div>
              
              <div class="mb-4">
                <mat-icon class="display-1 text-muted">cloud_off</mat-icon>
              </div>
              
              <h4 class="text-muted mb-3">{{ serviceName }} Service</h4>
              <p class="text-muted mb-4">
                The {{ serviceName }} microfrontend service is not responding. This typically happens when:
              </p>
              
              <ul class="list-unstyled text-start mb-4">
                <li class="mb-2">
                  <mat-icon class="me-2 text-muted" style="font-size: 16px;">radio_button_checked</mat-icon>
                  The Docker container for {{ serviceName }} is not running
                </li>
                <li class="mb-2">
                  <mat-icon class="me-2 text-muted" style="font-size: 16px;">radio_button_checked</mat-icon>
                  The development server is not started
                </li>
                <li class="mb-2">
                  <mat-icon class="me-2 text-muted" style="font-size: 16px;">radio_button_checked</mat-icon>
                  Network connectivity issues
                </li>
              </ul>
              
              <div class="d-flex gap-2 justify-content-center">
                <button mat-raised-button color="primary" (click)="goHome()">
                  <mat-icon class="me-1">home</mat-icon>
                  Go to Dashboard
                </button>
                <button mat-button (click)="retry()">
                  <mat-icon class="me-1">refresh</mat-icon>
                  Try Again
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .display-1 {
      font-size: 4rem;
    }
    
    .alert {
      border: 1px solid #f5c6cb;
      background-color: #f8d7da;
    }
    
    .alert-danger .alert-heading {
      color: #721c24;
    }
    
    .alert-danger {
      color: #721c24;
    }
    
    mat-card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    ul li {
      display: flex;
      align-items: center;
    }
  `]
})
export class ServiceUnavailableComponent {
  @Input() serviceName: string = 'Service';

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  retry() {
    window.location.reload();
  }
}