import { screen, render } from '@testing-library/react';

import { createWrapper } from '@shared/mock/jest';

import { Separator } from './Separator';

describe('shared/Separator', () => {
    const wrapper = createWrapper({});

    it('Компонент появился в DOM дереве', async () => {
        render(<Separator />, { wrapper });

        const component = await screen.findByTestId('Separator');
        expect(component).toBeInTheDocument();
    });
});
