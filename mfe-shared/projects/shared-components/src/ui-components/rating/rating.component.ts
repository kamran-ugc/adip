import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() maxStars: number = 5; // Number of stars
  @Input() rating: number = 0; // Default rating
  @Input() size: number = 30; // Star size
  @Input() theme: 'light' | 'dark' = 'dark'; // Light or dark theme
  @Output() ratingChange = new EventEmitter<number>(); // Event emitter for rating changes

  setRating(index: number) {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
  }
}
