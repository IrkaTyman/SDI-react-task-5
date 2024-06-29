import { FullMovieInfo } from './FullMovieInfo';

export type ShortMovieInfo = Omit<FullMovieInfo
    , 'actors' | 'total_rates_count'>;
