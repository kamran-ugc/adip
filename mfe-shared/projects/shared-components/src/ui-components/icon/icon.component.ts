import { Component, Input, OnInit, OnChanges, SimpleChanges, inject, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit, OnChanges {
    @Input() name!: string;
    @Input() size: string = 'custom';
    @Input() width: number = 24;
    @Input() height: number = 24;
    @Input() color: string = 'currentColor';
    @Input() customClass: string = '';

    // Host bindings to directly apply styles to the container
    @HostBinding('style.width.px') containerWidth?: number;
    @HostBinding('style.height.px') containerHeight?: number;

    svgContent: string = '';
    sanitizedSvg: SafeHtml = '';

    private http = inject(HttpClient);
    private sanitizer = inject(DomSanitizer);

    ngOnInit() {
        this.loadSvg();
        this.updateContainerDimensions();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['name'] || changes['size'] || changes['width'] || changes['height']) {
            this.loadSvg();
            this.updateContainerDimensions();
        }
    }

    get iconClasses(): string[] {
        const classes = ['icon-container'];

        // Add size class only for predefined sizes
        if (this.size && this.size !== 'custom') {
            classes.push(this.size);
        }

        // Add custom class if provided
        if (this.customClass) {
            classes.push(this.customClass);
        }

        return classes;
    }

    // Update container dimensions based on size or custom dimensions
    private updateContainerDimensions() {
        if (this.size === 'custom') {
            // For custom size, use the provided width and height
            this.containerWidth = this.width;
            this.containerHeight = this.height;
        } else {
            // For predefined sizes, get dimensions from size mapping
            const dimensions = this.getSizeDimensions(this.size);
            if (dimensions) {
                this.containerWidth = dimensions.width;
                this.containerHeight = dimensions.height;
            }
        }
    }

    loadSvg() {
        const iconPath = `/assets/icons/${this.name}.svg`;

        this.http.get(iconPath, { responseType: 'text' }).subscribe(
            (svg) => {
                let modifiedSvg = svg;

                // Add the svg-icon class for styling
                modifiedSvg = modifiedSvg.replace('<svg', '<svg class="svg-icon"');

                // Add stroke="currentColor" attribute
                modifiedSvg = modifiedSvg.replace('<svg', '<svg stroke="currentColor"');

                // Set width and height based on size
                if (this.size === 'custom') {
                    // Update width and height attributes in the SVG
                    modifiedSvg = modifiedSvg.replace(/width="([^"]*)"/, `width="${this.width}"`);
                    modifiedSvg = modifiedSvg.replace(/height="([^"]*)"/, `height="${this.height}"`);

                    // If width or height attributes don't exist, add them
                    if (!modifiedSvg.includes('width="')) {
                        modifiedSvg = modifiedSvg.replace('<svg', `<svg width="${this.width}"`);
                    }
                    if (!modifiedSvg.includes('height="')) {
                        modifiedSvg = modifiedSvg.replace('<svg', `<svg height="${this.height}"`);
                    }

                    // Also set inline style dimensions for better browser compatibility
                    modifiedSvg = modifiedSvg.replace('<svg', `<svg style="width:${this.width}px; height:${this.height}px;"`);
                } else {
                    // For predefined sizes, get dimensions from CSS
                    let dimensions = this.getSizeDimensions(this.size);

                    if (dimensions) {
                        // Update width and height attributes in the SVG
                        modifiedSvg = modifiedSvg.replace(/width="([^"]*)"/, `width="${dimensions?.width}"`);
                        modifiedSvg = modifiedSvg.replace(/height="([^"]*)"/, `height="${dimensions?.height}"`);

                        // If width or height attributes don't exist, add them
                        if (!modifiedSvg.includes('width="')) {
                            modifiedSvg = modifiedSvg.replace('<svg', `<svg width="${dimensions?.width}"`);
                        }
                        if (!modifiedSvg.includes('height="')) {
                            modifiedSvg = modifiedSvg.replace('<svg', `<svg height="${dimensions?.height}"`);
                        }

                        // Also set inline style dimensions for better browser compatibility
                        modifiedSvg = modifiedSvg.replace('<svg', `<svg style="width:${dimensions?.width}px; height:${dimensions?.height}px;"`);
                    }
                }

                this.svgContent = modifiedSvg;
                this.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(this.svgContent);
            },
            (error) => {
                console.error('Error loading SVG:', error);
            }
        );
    }

    // Helper method to get dimensions for predefined sizes
    private getSizeDimensions(size: string): { width: number, height: number } {
        switch (size) {
            case 'xs': return { width: 16, height: 16 };
            case 'sm': return { width: 20, height: 20 };
            case 'md': return { width: 24, height: 24 };
            case 'lg': return { width: 32, height: 32 };
            case 'xl': return { width: 48, height: 48 };
            default: return { width: 40, height: 40 };
        }
    }
}