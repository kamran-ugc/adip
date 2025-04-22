import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../custom-button/button.component';
import { CustomInputComponent } from '../input/custom-input.component';
import { ModalComponent } from './modal.component';


@Component({
  selector: 'app-modal-story',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ModalComponent, CustomInputComponent],
  template: `
    <div class="story-container">
      <div class="section">
        <h3 class="section-title">Default Modal</h3>
        <app-button 
          variant="primary" 
          (buttonClick)="toggleModal('default')"
          [disabled]="isModalOpen">
          Open Default Modal
        </app-button>
      </div>

      <div class="section">
        <h3 class="section-title">Custom Styled Modal</h3>
        <app-button 
          variant="primary" 
          (buttonClick)="toggleModal('custom')"
          [disabled]="isModalOpen">
          Open Custom Modal
        </app-button>
      </div>

      <div class="section">
        <h3 class="section-title">Dark Theme Modal</h3>
        <app-button 
          variant="primary" 
          (buttonClick)="toggleModal('dark')"
          [disabled]="isModalOpen">
          Open Dark Modal
        </app-button>
      </div>

      <app-modal
        [isOpen]="isModalOpen"
        [showCloseButton]="true"
        [closeOnOverlayClick]="true"
        [closeOnEscape]="true"
        [class]="currentModal.theme"
        (closeModal)="onModalClose()"
        (modalOpen)="onModalOpen()"
        (modalClose)="onModalClose()">
        
        <div class="modal-content-wrapper">
          <h3 class="modal-title">{{ currentModal.title }}</h3>
          <p class="modal-message">{{ currentModal.message }}</p>
          
          <div class="input-container">
            <app-custom-input
              label="Username"
              placeholder="Enter your username"
              supportingText="This is your unique identifier"
              [required]="true"
              [showCheckmark]="false"
              (inputChange)="onInputChange($event)">
            </app-custom-input>
          </div>

          <div class="button-container">
            <app-button 
              variant="secondary"
              [showArrow]="false"
              [fullWidth]="true"
              (buttonClick)="onModalClose()">
              Cancel
            </app-button>
            <app-button 
              variant="primary" 
              [showArrow]="false"
              [fullWidth]="true"
              (buttonClick)="onModalConfirm()">
              Confirm
            </app-button>
          </div>
        </div>
      </app-modal>
    </div>
  `,
  styles: [`
    .story-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 1rem;
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .section-title {
      font-size: 1.125rem;
      font-weight: 600;
    }
    .modal-content-wrapper {
      padding: 1rem;
    }
    .modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .modal-message {
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    .input-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.5rem;
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    /* Theme styles using CSS custom properties */
    :host ::ng-deep {
      .custom-theme {
        --modal-max-width: 600px;
        --modal-border-radius: 16px;
        --modal-background: linear-gradient(135deg, #ffffff 0%, #0880f8 100%);
        --modal-box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        --modal-overlay-background: rgba(0, 0, 0, 0.7);
        --modal-overlay-backdrop-filter: blur(8px);
      }
      
      .dark-theme {
        --modal-background: #1a1a1a;
        --modal-text-color: white;
        --modal-border: 1px solid #333;
        --modal-border-radius: 12px;
        --modal-box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        --modal-overlay-background: rgba(0, 0, 0, 0.9);
        --modal-overlay-backdrop-filter: blur(12px);
      }
    }
  `]
})
class ModalStoryComponent {
  isModalOpen = false;
  currentModal = {
    title: 'Default Modal',
    message: 'This is a default modal with standard styling.',
    theme: ''
  };

  toggleModal(type: 'default' | 'custom' | 'dark') {
    this.currentModal = {
      default: {
        title: 'Default Modal',
        message: 'This is a default modal with standard styling.',
        theme: ''
      },
      custom: {
        title: 'Custom Styled Modal',
        message: 'This modal demonstrates custom styling using CSS variables.',
        theme: 'custom-theme'
      },
      dark: {
        title: 'Dark Theme Modal',
        message: 'This modal demonstrates a dark theme using CSS variables.',
        theme: 'dark-theme'
      }
    }[type];
    this.isModalOpen = true;
  }

  onModalOpen() {
    console.log('Modal opened');
  }

  onModalClose() {
    this.isModalOpen = false;
    console.log('Modal closed');
  }

  onModalConfirm() {
    console.log('Modal confirmed');
    this.onModalClose();
  }

  onInputChange(value: string) {
    console.log('Input value changed:', value);
  }
}

const meta: Meta<ModalStoryComponent> = {
  component: ModalStoryComponent,
  title: 'Components/Modal',
  decorators: [
    moduleMetadata({
      imports: [ModalStoryComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible modal component that supports content projection and various configuration options.'
      },
      source: {
        state: 'open',
        type: 'code',
        code: `
// In your component
import { ModalComponent } from './modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: \`
    <app-modal
      [isOpen]="isModalOpen"
      title="My Modal"
      [showCloseButton]="true"
      [closeOnOverlayClick]="true"
      [closeOnEscape]="true"
      (closeModal)="onClose()"
      (modalOpen)="onOpen()"
      (modalClose)="onClose()">
      
      <!-- Your modal content here -->
      <div>Modal content goes here</div>
      
    </app-modal>
  \`
})
export class YourComponent {
  isModalOpen = false;

  onClose() {
    this.isModalOpen = false;
  }

  onOpen() {
    console.log('Modal opened');
  }
}
        `
      }
    }
  }
};

export default meta;

type Story = StoryObj<ModalStoryComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic example of a modal with content projection, showing form inputs and action buttons.'
      },
      source: {
        state: 'open',
        type: 'code',
        code: `

@Component({
  selector: 'app-modal-story',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ModalComponent, CustomInputComponent],
  template: \`
          <div class="story-container">
            <div class="section">
              <h3 class="section-title"> Default Modal</h3>
        <app-button 
          variant="primary"
          (buttonClick) = "toggleModal('default')"
          [disabled] = "isModalOpen">
            Open Default Modal
        </app-button>
      </div>

        <div class= "section">
          <h3 class="section-title"> Custom Styled Modal</h3>
        <app-button 
        variant="primary"
        (buttonClick) = "toggleModal('custom')"
        [disabled] = "isModalOpen">
        Open Custom Modal
          </ app - button >
        </div>

        <div class="section">
          <h3 class="section-title" > Dark Theme Modal </h3>
          <app-button 
          variant = "primary"
          (buttonClick) = "toggleModal('dark')"
          [disabled] = "isModalOpen" >
          Open Dark Modal
        </app-button>
      </div>

    <app-modal
    [isOpen]="isModalOpen"
    [showCloseButton] = "true"
    [closeOnOverlayClick] = "true"
    [closeOnEscape] = "true"
    [class] = "currentModal.theme"
    (closeModal) = "onModalClose()"
    (modalOpen) = "onModalOpen()"
    (modalClose) = "onModalClose()">

      <div class="modal-content-wrapper" >
        <h3 class="modal-title" > {{ currentModal.title }}</h3>
          <p p class="modal-message" > {{ currentModal.message }}</p>

            <div class="input-container">
              <app-custom-input
              label = "Username"
              placeholder = "Enter your username"
              supportingText = "This is your unique identifier"
              [required] = "true"
          [showCheckmark] = "false"
            (inputChange) = "onInputChange($event)" >
            </app-custom-input>
        </div>

        <div class="button-container">
    <app-button
variant = "secondary"
[showArrow] = "false"
[fullWidth] = "true"
  (buttonClick) = "onModalClose()" >
  Cancel
  </app-button>
  <app-button
  variant = "primary"
  [showArrow] = "false"
  [fullWidth] = "true"
  (buttonClick) = "onModalConfirm()" >
  Confirm
  </app-button>
  </div>
  </div>
  </app-modal>
  </div>
    \`,
  styles: \`
    .story-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}
    .section {
  display: flex;
  flex - direction: column;
  gap: 0.5rem;
}
    .section - title {
  font - size: 1.125rem;
  font - weight: 600;
}
    .modal - content - wrapper {
  padding: 1rem;
}
    .modal - title {
  font - size: 1.25rem;
  font - weight: 600;
  margin - bottom: 1rem;
}
    .modal - message {
  margin - bottom: 1rem;
  line - height: 1.5;
}
    .input - container {
  display: flex;
  flex - direction: column;
  margin - bottom: 1.5rem;
}
    .button - container {
  display: flex;
  justify - content: flex - end;
  gap: 0.5rem;
}

    /* Theme styles using CSS custom properties */
    : host:: ng - deep {
      .custom - theme {
    --modal - max - width: 600px;
    --modal - border - radius: 16px;
    --modal - background: linear - gradient(135deg, #ffffff 0 %, #0880f8 100 %);
    --modal - box - shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    --modal - overlay - background: rgba(0, 0, 0, 0.7);
    --modal - overlay - backdrop - filter: blur(8px);
  }
      
      .dark - theme {
    --modal - background: #1a1a1a;
    --modal - text - color: white;
    --modal - border: 1px solid #333;
    --modal - border - radius: 12px;
    --modal - box - shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    --modal - overlay - background: rgba(0, 0, 0, 0.9);
    --modal - overlay - backdrop - filter: blur(12px);
  }
}
  \`]
})
class ModalStoryComponent {
  isModalOpen = false;
  currentModal = {
    title: 'Default Modal',
    message: 'This is a default modal with standard styling.',
    theme: ''
  };

  toggleModal(type: 'default' | 'custom' | 'dark') {
    this.currentModal = {
      default: {
        title: 'Default Modal',
        message: 'This is a default modal with standard styling.',
        theme: ''
      },
      custom: {
        title: 'Custom Styled Modal',
        message: 'This modal demonstrates custom styling using CSS variables.',
        theme: 'custom-theme'
      },
      dark: {
        title: 'Dark Theme Modal',
        message: 'This modal demonstrates a dark theme using CSS variables.',
        theme: 'dark-theme'
      }
    }[type];
    this.isModalOpen = true;
  }

  onModalOpen() {
    console.log('Modal opened');
  }

  onModalClose() {
    this.isModalOpen = false;
    console.log('Modal closed');
  }

  onModalConfirm() {
    console.log('Modal confirmed');
    this.onModalClose();
  }

  onInputChange(value: string) {
    console.log('Input value changed:', value);
  }
}
        `
      }
    }
  }
};