import * as H from 'history';
import React from 'react';

import { RouterWrapper } from './RouterWrapper';
import { SuspenseWrapper } from './SuspenseWrapper';

type WrapperOptions = Partial<{
    route: string;
    routerEntries: H.LocationDescriptor[];
    additionalWrappers: ((component: React.JSX.Element) => React.JSX.Element)[];
}>;

export function createWrapper({
    route = '/',
    routerEntries = ['/'],
    additionalWrappers = [],
}: WrapperOptions): React.JSXElementConstructor<{children: React.ReactElement}> {
    return ({ children }) => {
        const wrappers = [
            SuspenseWrapper,
            RouterWrapper(route, routerEntries),
            ...additionalWrappers,
        ];

        let component = children;
        for (const wrapper of wrappers) {
            component = wrapper(component);
        }
        return component;
    };
}
