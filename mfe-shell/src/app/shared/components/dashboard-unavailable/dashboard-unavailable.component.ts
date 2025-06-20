import { Component } from '@angular/core';
import { ServiceUnavailableComponent } from '../service-unavailable/service-unavailable.component';

@Component({
  selector: 'app-dashboard-unavailable',
  standalone: true,
  imports: [ServiceUnavailableComponent],
  template: `<app-service-unavailable serviceName="Dashboard"></app-service-unavailable>`
})
export class DashboardUnavailableComponent {}