import { ConfigRouteProps } from '@shared/types';

import { MoviePage } from './MoviePage';
import { MoviesPage } from './MoviesPage';

export const MovieRouteUrls = {
    Main: '/movies',
    Movie: (id: string) => `/movies/${id}`,
};

export const movieRoutes: ConfigRouteProps[] = [
    {
        path: MovieRouteUrls.Main,
        element: <MoviesPage />,
    },
    {
        path: MovieRouteUrls.Movie(':id'),
        element: <MoviePage />,
    },
];
