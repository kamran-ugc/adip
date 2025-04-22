import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

export interface TabOption {
    id: string | number;
    label: string;
    icon?: string;
    letter?: string;
}

@Component({
    selector: 'app-tab-selection',
    standalone: true,
    imports: [CommonModule, FormsModule, IconComponent],
    templateUrl: './tab-selection.component.html',
    styleUrls: ['./tab-selection.component.scss'],
    // Ensure proper Angular Material icons support
    encapsulation: ViewEncapsulation.None
})
export class TabSelectionComponent {
    @Input() options: TabOption[] = [];
    @Input() multiSelect = false;
    @Input() initialSelected: (string | number)[] = [];

    @Output() selectionChange = new EventEmitter<TabOption[]>();

    selectedIds: (string | number)[] = [];

    ngOnInit() {
        this.selectedIds = [...this.initialSelected];
    }

    isSelected(option: TabOption): boolean {
        return this.selectedIds.includes(option.id);
    }

    toggleSelection(option: TabOption): void {
        if (this.multiSelect) {
            if (this.isSelected(option)) {
                this.selectedIds = this.selectedIds.filter(id => id !== option.id);
            } else {
                this.selectedIds = [...this.selectedIds, option.id];
            }
        } else {
            this.selectedIds = [option.id];
        }

        const selectedOptions = this.options.filter(opt => this.selectedIds.includes(opt.id));
        this.selectionChange.emit(selectedOptions);
    }
}