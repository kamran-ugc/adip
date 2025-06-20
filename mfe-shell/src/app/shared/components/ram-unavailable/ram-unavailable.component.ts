import { Component } from '@angular/core';
import { ServiceUnavailableComponent } from '../service-unavailable/service-unavailable.component';

@Component({
  selector: 'app-ram-unavailable',
  standalone: true,
  imports: [ServiceUnavailableComponent],
  template: `<app-service-unavailable serviceName="RAM (Risk Assessment and Mitigation)"></app-service-unavailable>`
})
export class RamUnavailableComponent {}