import { Component, Input } from '@angular/core';

@Component({
  selector: 'responsive-layout',
  standalone: true,
  templateUrl: './responsive-layout.component.html',
  styleUrls: ['./responsive-layout.component.scss']
})
export class ResponsiveLayoutComponent {
  @Input() titleWeb: string = "Web";
  @Input() titleMobile: string = "Mobile";
}
