import { MoviePage } from '@pages/movie/MoviePage';
import { MoviesPage } from '@pages/movie/MoviesPage';

import { ConfigRouteProps } from '@shared/types';

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
