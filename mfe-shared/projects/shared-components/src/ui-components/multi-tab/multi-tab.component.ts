import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-multi-tab',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './multi-tab.component.html',
  styleUrls: ['./multi-tab.component.scss']
})
export class MultiTabComponent {
  @Input() mainTabs: string[] = [];
  @Input() activeMainTab: string = '';
  @Output() mainTabChange = new EventEmitter<string>();

  setMainTab(tab: string): void {
    this.activeMainTab = tab;
    this.mainTabChange.emit(tab);
  }
}
