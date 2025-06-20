import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  ramId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ramId = this.route.snapshot.params['ramId'] || '';
  }
}