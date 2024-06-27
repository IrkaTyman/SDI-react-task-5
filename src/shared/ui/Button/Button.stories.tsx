import { Meta, StoryObj } from '@storybook/react';

import { Button, Props } from './Button';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        children: 'Click',
    },
};

export const SolidDanger: Story = {
    args: {
        children: 'Click',
        color: 'danger',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Click',
    },
};

export const Bordered: Story = {
    args: {
        variant: 'bordered',
        children: 'Click',
    },
};

export const BorderedDanger: Story = {
    args: {
        variant: 'bordered',
        color: 'danger',
        children: 'Click',
    },
};

export const IsLoading: Story = {
    args: {
        isLoading: true,
        children: 'Click',
    },
};
