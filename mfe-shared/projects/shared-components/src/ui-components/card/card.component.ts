import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() type: 'investment' | 'balance' | 'course' | 'practice' | 'thematic' = 'investment';
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() imageUrl?: string;
  @Input() description?: string;
  @Input() amount?: string;
  @Input() percentage?: string;
  @Input() actionText?: string;
  @Input() actionLink?: string;
}
