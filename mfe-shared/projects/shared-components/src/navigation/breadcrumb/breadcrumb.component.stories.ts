import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';
import { Breadcrumb } from './breadcrumb.model';

// Mock BreadcrumbService
class MockBreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }
}

const meta: Meta<BreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterModule],
      providers: [
        { provide: BreadcrumbService, useClass: MockBreadcrumbService }
      ]
    }),
    applicationConfig({
      providers: [
        provideRouter([])
      ]
    })
  ],
  parameters: {
    layout: 'padded',
  },
  render: (args) => {
    return {
      props: {
        ...args,
        ngOnInit: function () {
          const service = this["breadcrumbService"] as MockBreadcrumbService;
          service.setBreadcrumbs(args['breadcrumbs'] || []);
        }
      },
    };
  },
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Category', url: '/products/category' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Default breadcrumb with three levels'
      }
    }
  }
};

export const SingleItem: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', url: '/' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with only home item'
      }
    }
  }
};

export const LongPath: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Electronics', url: '/products/electronics' },
      { label: 'Computers', url: '/products/electronics/computers' },
      { label: 'Laptops', url: '/products/electronics/computers/laptops' },
      { label: 'Gaming Laptops', url: '/products/electronics/computers/laptops/gaming' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with a deep nesting path'
      }
    }
  }
};

export const WithLongLabels: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Department of Administrative Services', url: '/department' },
      { label: 'Information Technology Management Division', url: '/department/it' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with long label texts to test overflow handling'
      }
    }
  }
};

export const WithoutLinks: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Current Page', url: '' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with the last item having no link (current page)'
      }
    }
  }
};

export const WithIcon: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', url: '/', icon: 'home' },
      { label: 'Products', url: '/products' },
      { label: 'Details', url: '/products/details' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with an icon in the home item'
      }
    }
  }
};

export const Empty: Story = {
  args: {
    breadcrumbs: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with no items (should be hidden or show fallback)'
      }
    }
  }
};

// Custom styling examples
export const CustomSeparator: Story = {
  args: {
    ...Default.args,
    separator: '>',
    customClass: 'custom-separator'
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with custom separator (>)'
      }
    }
  }
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    customClass: 'custom-colors',
    activeItemClass: 'active-item',
    inactiveItemClass: 'inactive-item'
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with custom colors using CSS variables'
      }
    }
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `
        <style>
          :root {
            --breadcrumb-bg: #f0f8ff;
            --breadcrumb-link-color: #2c3e50;
            --breadcrumb-separator-color: #7f8c8d;
            --breadcrumb-active-color: #e74c3c;
            --breadcrumb-link-hover-color: #3498db;
          }
        </style>
        ${story().template}
      `
    })
  ]
};

export const NoIcons: Story = {
  args: {
    ...Default.args,
    showIcons: false,
    customClass: 'no-icons'
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb without icons'
      }
    }
  }
};

export const CustomActiveStyle: Story = {
  args: {
    ...Default.args,
    activeItemClass: 'active-bold',
    inactiveItemClass: 'inactive-normal'
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with custom active item styling'
      }
    }
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `
        <style>
          .active-bold {
            font-weight: bold;
            color: #2c3e50;
          }
          .inactive-normal {
            font-weight: normal;
            color: #95a5a6;
          }
        </style>
        ${story().template}
      `
    })
  ]
};

export const MinimalStyle: Story = {
  args: {
    ...Default.args,
    customClass: 'minimal-style',
    separator: '•'
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal style breadcrumb with dot separator'
      }
    }
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `
        <div class="minimal-style-container">
          <style>
            .minimal-style-container {
              --breadcrumb-bg: transparent;
              --breadcrumb-link-color: #ff0202;
              --breadcrumb-separator-color: #999999;
              --breadcrumb-active-color: #333333;
              --breadcrumb-link-hover-color: #000000;
            }
            .minimal-style {
              padding: 0;
            }
            .minimal-style .breadcrumb {
              background-color: var(--breadcrumb-bg);
            }
            .minimal-style .breadcrumb li a {
              color: var(--breadcrumb-link-color);
            }
            .minimal-style .breadcrumb li .separator {
              color: var(--breadcrumb-separator-color);
            }
            .minimal-style .breadcrumb li span:not(.separator) {
              color: var(--breadcrumb-active-color);
            }
            .minimal-style .breadcrumb li a:hover {
              color: var(--breadcrumb-link-hover-color);
            }
          </style>
          ${story().template}
        </div>
      `
    })
  ]
};

export const UsageGuide: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', url: '/', icon: 'home' },
      { label: 'Products', url: '/products' },
      { label: 'Details', url: '/products/details' }
    ],
    customClass: 'usage-guide',
    activeItemClass: 'active-item',
    inactiveItemClass: 'inactive-item'
  },
  parameters: {
    docs: {
      description: {
        story: `
# Breadcrumb Usage Guide

## Basic Usage
The breadcrumb component can be used with minimal configuration:

\`\`\`typescript
<app-breadcrumb [breadcrumbs]="breadcrumbs"></app-breadcrumb>
\`\`\`

## Custom Styling Options

### 1. Custom Classes
You can apply custom classes to the breadcrumb component:

\`\`\`typescript
<app-breadcrumb 
  [breadcrumbs]="breadcrumbs"
  customClass="my-custom-class"
  activeItemClass="active-item"
  inactiveItemClass="inactive-item">
</app-breadcrumb>
\`\`\`

### 2. Custom Separator
Change the default separator between breadcrumb items:

\`\`\`typescript
<app-breadcrumb 
  [breadcrumbs]="breadcrumbs"
  separator=">">
</app-breadcrumb>
\`\`\`

### 3. CSS Variables
The component supports the following CSS variables for styling:

\`\`\`css
:root {
  --breadcrumb-bg: #f0f8ff;
  --breadcrumb-link-color: #2c3e50;
  --breadcrumb-separator-color: #7f8c8d;
  --breadcrumb-active-color: #e74c3c;
  --breadcrumb-link-hover-color: #3498db;
}
\`\`\`

### 4. Icon Customization
You can add icons to breadcrumb items:

\`\`\`typescript
breadcrumbs = [
  { label: 'Home', url: '/', icon: 'home' },
  { label: 'Products', url: '/products' }
];
\`\`\`

## Best Practices
1. Keep breadcrumb labels concise and meaningful
2. Use icons sparingly and consistently
3. Ensure proper contrast for accessibility
4. Test with long labels to ensure proper overflow handling
5. Consider mobile responsiveness in your styling

## Accessibility
- The component is built with proper ARIA attributes
- Ensure sufficient color contrast for text and links
- Maintain proper focus states for keyboard navigation
`
      }
    }
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `
        <div class="usage-guide-container">
          <style>
            .usage-guide-container {
              --breadcrumb-bg: #f8f9fa;
              --breadcrumb-link-color: #007bff;
              --breadcrumb-separator-color: #6c757d;
              --breadcrumb-active-color: #495057;
              --breadcrumb-link-hover-color: #0056b3;
            }
            .usage-guide {
              padding: 1rem;
              border-radius: 4px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .active-item {
              font-weight: 600;
              color: var(--breadcrumb-active-color);
            }
            .inactive-item {
              color: var(--breadcrumb-link-color);
            }
            .inactive-item:hover {
              color: var(--breadcrumb-link-hover-color);
              text-decoration: underline;
            }
          </style>
          ${story().template}
        </div>
      `
    })
  ]
};