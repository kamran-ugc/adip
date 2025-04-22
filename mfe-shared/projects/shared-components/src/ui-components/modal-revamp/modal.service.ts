import { Injectable, ViewContainerRef, Type, ComponentRef, ApplicationRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ModalComponent } from './modal.component';

export interface ModalConfig {
    title?: string;
    modalWidth?: string;
    data?: any;
}

export interface ModalRef {
    afterClosed: Observable<any>;
    close: (result?: any) => void;
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private viewContainerRef: ViewContainerRef | null = null;

    constructor(private appRef: ApplicationRef) { }

    /**
     * Set the view container ref that will host the modals
     */
    setViewContainerRef(vcr: ViewContainerRef): void {
        this.viewContainerRef = vcr;
    }

    /**
     * Open a modal with the provided component and configuration
     */
    open<T extends object, R = any>(component: Type<T>, config: ModalConfig = {}): ModalRef {
        if (!this.viewContainerRef) {
            throw new Error('You must call setViewContainerRef before opening a modal.');
        }

        // Create the modal component
        const modalRef = this.viewContainerRef.createComponent(ModalComponent);

        // Set modal configuration
        modalRef.instance.isOpen = true;
        modalRef.instance.modalWidth = config.modalWidth || '480px';

        // When modal is open, prevent scrolling on body
        document.body.classList.add('modal-open');

        // Create a subject that will emit when the modal is closed
        const afterClosed = new Subject<R>();

        // Add close method
        const close = (result: R) => {
            // Allow scrolling again
            document.body.classList.remove('modal-open');

            // Remove the modal component
            const modalIndex = this.viewContainerRef!.indexOf(modalRef.hostView);
            if (modalIndex !== -1) {
                this.viewContainerRef!.remove(modalIndex);
            }

            // Emit the close event with the result
            afterClosed.next(result);
            afterClosed.complete();
        };

        // Hook up modal events
        modalRef.instance.closeModal.subscribe(() => close(null as R));

        // Wait for the next tick to ensure the view is initialized
        this.appRef.tick();

        // Create the content component after view initialization
        if (modalRef.instance.contentContainer) {
            const contentRef = modalRef.instance.contentContainer.createComponent(component);

            // Set data on the content component if provided
            if (config.data) {
                Object.assign(contentRef.instance, { data: config.data });
            }
        } else {
            console.error('Content container not initialized');
            close(null as R);
        }

        return {
            afterClosed: afterClosed.asObservable(),
            close
        };
    }
}