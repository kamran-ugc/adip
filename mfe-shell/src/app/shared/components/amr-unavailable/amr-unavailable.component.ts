import { Component } from '@angular/core';
import { ServiceUnavailableComponent } from '../service-unavailable/service-unavailable.component';

@Component({
  selector: 'app-amr-unavailable',
  standalone: true,
  imports: [ServiceUnavailableComponent],
  template: `<app-service-unavailable serviceName="AMR (Asset Management and Reporting)"></app-service-unavailable>`
})
export class AmrUnavailableComponent {}