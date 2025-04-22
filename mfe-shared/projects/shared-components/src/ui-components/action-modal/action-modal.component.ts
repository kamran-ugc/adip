import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from "../shared-components.module";
import { IconComponent } from "../icon/icon.component";

export interface ActionButton {
    label: string;
    color?: 'primary' | 'secondary' | 'success' | 'danger';
    action?: string;
}

export type LayoutVariant = 'vertical' | 'horizontal';

@Component({
    selector: 'app-action-modal',
    imports: [CommonModule, IconComponent],
    templateUrl: './action-modal.component.html',
    styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent {
    @Input() title: string = 'The title goes here';
    @Input() description: string = 'Discover top stocks investors are buying and track market trends.';
    @Input() iconSrc: string | null = null;
    @Input() buttons: ActionButton[] = [];
    @Input() variant: LayoutVariant = 'vertical';

    // Custom styling inputs
    @Input() customClass: string = '';
    @Input() modalClass: string = '';
    @Input() contentClass: string = '';
    @Input() titleClass: string = '';
    @Input() descriptionClass: string = '';
    @Input() buttonClass: string = '';
    @Input() iconClass: string = '';

    @Output() buttonClick = new EventEmitter<string>();

    /**
     * Handle button click and emit the action
     */
    onButtonClick(action: string | undefined): void {
        this.buttonClick.emit(action || 'click');
    }

    /**
     * Check if icon is provided
     */
    get hasIcon(): boolean {
        return !!this.iconSrc;
    }

    /**
     * Get the button color class
     */
    getButtonColorClass(color: string | undefined): string {
        switch (color) {
            case 'primary': return 'primary-button';
            case 'secondary': return 'secondary-button';
            case 'success': return 'success-button';
            case 'danger': return 'danger-button';
            default: return 'secondary-button';
        }
    }

    /**
     * Get combined classes for the modal
     */
    getModalClasses(): string {
        return ['action-modal', this.variant, this.customClass, this.modalClass].filter(Boolean).join(' ');
    }

    /**
     * Get combined classes for the content
     */
    getContentClasses(): string {
        return ['modal-content', this.contentClass].filter(Boolean).join(' ');
    }

    /**
     * Get combined classes for the title
     */
    getTitleClasses(): string {
        return ['title', this.titleClass].filter(Boolean).join(' ');
    }

    /**
     * Get combined classes for the description
     */
    getDescriptionClasses(): string {
        return ['description', this.descriptionClass].filter(Boolean).join(' ');
    }

    /**
     * Get combined classes for the button
     */
    getButtonClasses(color: string | undefined): string {
        return ['action-button', this.getButtonColorClass(color), this.buttonClass].filter(Boolean).join(' ');
    }

    /**
     * Get combined classes for the icon container
     */
    getIconClasses(): string {
        return ['icon-container', this.iconClass].filter(Boolean).join(' ');
    }
}