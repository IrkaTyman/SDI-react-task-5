import { Actor } from './Actor';

export type FullMovieInfo = {
    id: string;
    title: string;
    description: string;
    release_year: number;
    poster: string;
    genre: string;
    rating: string;
    total_rates_count: string;
    actors: Actor[];
};
