'use client';

import { MoviePage } from '@views/movie/MoviePage';

export const ClientOnly = ({ id }: {id: string}) => {
    return <MoviePage id={id} />;
};
