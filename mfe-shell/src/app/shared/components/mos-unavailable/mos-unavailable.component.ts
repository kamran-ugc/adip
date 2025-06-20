import { Component } from '@angular/core';
import { ServiceUnavailableComponent } from '../service-unavailable/service-unavailable.component';

@Component({
  selector: 'app-mos-unavailable',
  standalone: true,
  imports: [ServiceUnavailableComponent],
  template: `<app-service-unavailable serviceName="MOS (Modifications of Standards)"></app-service-unavailable>`
})
export class MosUnavailableComponent {}