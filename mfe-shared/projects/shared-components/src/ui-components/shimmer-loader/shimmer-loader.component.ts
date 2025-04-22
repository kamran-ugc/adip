import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shimmer-loader',
  templateUrl: './shimmer-loader.component.html',
  styleUrls: ['./shimmer-loader.component.scss']
})
export class ShimmerLoaderComponent {
  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() borderRadius: string = '4px';
}