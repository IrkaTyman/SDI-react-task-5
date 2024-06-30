import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { RateMovieParams } from '@features/rate-movie';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { FullMovieInfo, MovieParams, ShortMovieInfo } from '@entities/movie';

import { getURLWithQueryParams } from '@shared/lib';

import { authHeader } from './authHeader';

export const movieService = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery(authHeader()),
    tagTypes: ['Movie'],
    endpoints: builder => ({
        getMovie: builder.query<FullMovieInfo, string>({
            query: id => `movie/${id}`,
            keepUnusedDataFor: 5,
            providesTags: (res, error, arg) =>
                [{ type: 'Movie', id: arg }],
        }),
        getMovies: builder.query<{search_result: ShortMovieInfo[]}, MovieParams>({
            query: params => ({
                url: getURLWithQueryParams('search', { title: params.title, genre: params.genre, release_year: params.releaseYear }),
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Movie'],
        }),
        rateMovie: builder.mutation<void, RateMovieParams>({
            query: params => ({
                url: 'rateMovie',
                body: {
                    user_rate: params.userRate,
                    movieId: params.movieId,
                },
                method: 'POST',
            }),
            invalidatesTags: (res, error, arg) => ['Movie', { type: 'Movie', id: arg.movieId }],
        }),
    }),
});

// Auto generated hook - starts with use & ends on query
export const { useGetMovieQuery, useGetMoviesQuery, useRateMovieMutation } = movieService;
