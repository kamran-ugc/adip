import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ViewContainerRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() isOpen = false;
    @Input() modalWidth: string = '480px';
    @Input() closeOnOverlayClick: boolean = true;
    @Input() closeOnEscape: boolean = true;
    @Input() showOverlay: boolean = true;
    @Input() overlayClass: string = '';
    @Input() modalClass = '';

    @Output() closeModal = new EventEmitter<void>();
    @Output() modalOpen = new EventEmitter<void>();
    @Output() modalClose = new EventEmitter<void>();

    @ViewChild('contentContainer', { read: ViewContainerRef, static: true }) contentContainer!: ViewContainerRef;

    private destroy$ = new Subject<void>();

    constructor() { }

    ngOnInit(): void {
        if (this.isOpen) {
            this.handleOpen();
        }
    }

    ngAfterViewInit() {
        if (!this.contentContainer) {
            console.error('Content container not initialized');
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.handleClose();
    }

    onClose(): void {
        this.handleClose();
    }

    onModalContentClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    onOverlayClick(): void {
        if (this.closeOnOverlayClick) {
            this.handleClose();
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if (this.closeOnEscape && event.key === 'Escape') {
            this.handleClose();
        }
    }

    private handleOpen(): void {
        document.body.classList.add('modal-open');
        this.modalOpen.emit();
    }

    private handleClose(): void {
        document.body.classList.remove('modal-open');
        this.closeModal.emit();
        this.modalClose.emit();
    }

    // Public method to open modal
    open(): void {
        this.isOpen = true;
        this.handleOpen();
    }

    // Public method to close modal
    close(): void {
        this.isOpen = false;
        this.handleClose();
    }

    @HostListener('document:keydown.escape')
    onEscapePress() {
        if (this.closeOnEscape && this.isOpen) {
            this.handleClose();
        }
    }
}