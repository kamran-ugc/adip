import { Component } from '@angular/core';
import { ServiceUnavailableComponent } from '../service-unavailable/service-unavailable.component';

@Component({
  selector: 'app-adm-unavailable',
  standalone: true,
  imports: [ServiceUnavailableComponent],
  template: `<app-service-unavailable serviceName="ADM (Airport Data Management)"></app-service-unavailable>`
})
export class AdmUnavailableComponent {}