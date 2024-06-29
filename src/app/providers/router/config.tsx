import { Navigate } from 'react-router-dom';

import { movieRoutes, MovieRouteUrls } from '@pages/movie';

import { ConfigRouteProps } from '@shared/types';

export const routeConfig: ConfigRouteProps[] = [
    ...movieRoutes,
    {
        path: '*',
        element: <Navigate to={MovieRouteUrls.Main} />,
    },
];
