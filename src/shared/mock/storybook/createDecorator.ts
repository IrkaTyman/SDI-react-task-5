import { Decorator } from '@storybook/react';
import * as H from 'history';

import { RouterDecorator } from './RouterDecorator';

type WrapperOptions = Partial<{
    route: string;
    routerEntries: H.LocationDescriptor[];
    additionalDecorators: Decorator[];
}>;

/**
 * Метод возвращает все необходимые декораторы storybook
 * @param axiosMocks моки axios
 * @param route текущий путь в роутере (default: '')
 * @param routerEntries текущая история роутера (default: [])
 * @param options
 */
export function createDecorators({
    route = '',
    routerEntries = [''],
    additionalDecorators = [],
}: WrapperOptions): Decorator[] {
    return [
        RouterDecorator(route, routerEntries),
        ...additionalDecorators,
    ];
}
