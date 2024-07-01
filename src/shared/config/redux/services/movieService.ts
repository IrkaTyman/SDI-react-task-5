import { createApi } from '@reduxjs/toolkit/query/react';

import { RateMovieParams } from '@features/rate-movie';

import { FullMovieInfo, MovieParams, ShortMovieInfo } from '@entities/movie';

import { getURLWithQueryParams } from '@shared/lib';

import { axiosBaseQuery } from './axiosBaseHeader';

export const movieService = createApi({
    reducerPath: 'movieApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Movie'],
    endpoints: builder => ({
        getMovie: builder.query<FullMovieInfo, string>({
            query: id => ({
                url: `movie/${id}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: (res, error, arg) =>
                [{ type: 'Movie', id: arg }],
        }),
        getMovies: builder.query<{search_result: ShortMovieInfo[]; total_pages: number}, MovieParams>({
            query: params => ({
                url: getURLWithQueryParams('search', {
                    title: params.title,
                    genre: params.genre,
                    release_year: params.releaseYear,
                    page: params.page,
                }),
                method: 'GET',
            }),
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
            invalidatesTags: (res, error, arg) =>
                [{ type: 'Movie', id: arg.movieId }],
        }),
    }),
});

// Auto generated hook - starts with use & ends on query
export const { useGetMovieQuery, useGetMoviesQuery, useRateMovieMutation } = movieService;
