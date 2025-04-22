import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, type Preview } from '@storybook/angular';
import 'zone.js';

const preview: Preview = {
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, BrowserAnimationsModule],
    }),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    assets: {
      base: '/assets/',
    },
    // Add this to help handle potential style injection issues
    injectGlobalStyles: true,
  },
};

export default preview;