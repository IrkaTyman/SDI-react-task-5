import type { Preview } from '@storybook/react';

import { StyleDecorator, SuspenseDecorator } from '../../src/shared/mock/storybook';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        StyleDecorator,
        SuspenseDecorator,
    ],
};

export default preview;
