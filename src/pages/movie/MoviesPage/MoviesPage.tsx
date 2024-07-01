import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { RateMovieButtons } from '@features/rate-movie';

import { GENRES_MAP, MovieParams } from '@entities/movie';
import { YEARS } from '@entities/movie/model/Years';
import { MovieCard } from '@entities/movie/ui/MovieCard';

import ArrowLeft from '@shared/assets/icons/ArrowLeft.svg';
import ArrowRight from '@shared/assets/icons/ArrowRight.svg';
import Search from '@shared/assets/icons/Search.svg';
import { useGetMoviesQuery } from '@shared/config/redux/services/movieService';
import { useDebounceState, useSearchParamState } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Input, Loader, renderOption, Select, SelectItem, Text } from '@shared/ui';

import { EmptyMovies } from './EmptyMovies';
import styles from './MoviesPage.module.css';

export type Props = ClassNameProps & TestProps;

const genresOptions: SelectItem<string>[] = Object.keys(GENRES_MAP).map((key: keyof typeof GENRES_MAP) => ({
    value: key,
    label: GENRES_MAP[key],
}));

const yearsOptions: SelectItem<string>[] = Object.keys(YEARS).map((key: keyof typeof YEARS) => ({
    value: key,
    label: YEARS[key],
}));

export const MoviesPage: FC<Props> = typedMemo(function MoviesPage({
    className,
}) {
    const [page, setPage] = useSearchParamState('page');

    const [title, setTitle] = useSearchParamState('title');
    const debounceSearch = useDebounceState(title, 300);

    const [selectedGenreId, setSelectedGenreId] = useSearchParamState('genre');
    const [selectedYearId, setSelectedYearId] = useSearchParamState('year');

    const [selectedGenres, setSelectedGenres] = useState<SelectItem<string>[]>(
        genresOptions.filter(genre => genre.value === (selectedGenreId ?? '0')),
    );
    const [selectedYears, setSelectedYears] = useState<SelectItem<string>[]>(
        yearsOptions.filter(year => year.value === (selectedYearId ?? '0')),
    );

    const params = useMemo<MovieParams>(() => ({
        title: debounceSearch ?? undefined,
        page: page ?? undefined,
        releaseYear: selectedYears[0]?.value === '0' ? undefined : selectedYears[0]?.value ?? undefined,
        genre: selectedGenres[0]?.value === '0' ? undefined : selectedGenres[0]?.value ?? undefined,
    }), [debounceSearch, selectedGenres, selectedYears, page]);
    const { data, isLoading } = useGetMoviesQuery(params);

    useEffect(() => {
        if (!page) {
            setPage(String(1));
        }
    }, [page]);

    useEffect(() => {
        if (selectedGenreId !== selectedGenres[0].value) {
            setSelectedGenres(genresOptions.filter(genre => genre.value === (selectedGenreId ?? '0')));
        }
    }, [selectedGenreId]);

    useEffect(() => {
        if (selectedYearId !== selectedYears[0].value) {
            setSelectedYears(yearsOptions.filter(year => year.value === (selectedYearId ?? '0')));
        }
    }, [selectedGenreId]);

    const toBack = useCallback(() => {
        const parsedPage = Number(page);
        if (parsedPage <= 1) {
            return;
        }
        setPage(String(parsedPage - 1));
    }, [page, setPage]);

    const toNext = useCallback(() => {
        const parsedPage = Number(page);
        if (parsedPage >= (data?.total_pages ?? 100)) {
            return;
        }
        setPage(String(parsedPage + 1));
    }, [page, setPage, data]);

    return (
        <FlexContainer
            className={getBemClasses(styles, null, null, className)}
            direction="row"
            overflow="nowrap"
            alignItems="stretch"
            gap="l"
        >
            <FlexContainer
                direction="column"
                gap="m"
                className={getBemClasses(styles, 'filters')}
            >
                <Text className={getBemClasses(styles, 'filtersTitle')}>
                    Фильтры
                </Text>

                <FlexContainer
                    direction="column"
                    gap="xxs"
                    className={getBemClasses(styles, 'filter')}
                >
                    <Text>
                        Жанр
                    </Text>
                    <Select
                        selectedValues={selectedGenres}
                        onSelect={items => {
                            setSelectedGenres(items);
                            setSelectedGenreId(items[0].value);
                        }}
                    >
                        {genresOptions.map(renderOption)}
                    </Select>
                </FlexContainer>
                <FlexContainer
                    direction="column"
                    gap="xxs"
                    className={getBemClasses(styles, 'filter')}
                >
                    <Text>
                        Год выпуска
                    </Text>
                    <Select
                        selectedValues={selectedYears}
                        onSelect={items => {
                            setSelectedYears(items);
                            setSelectedYearId(items[0].value);
                        }}
                    >
                        {yearsOptions.map(renderOption)}
                    </Select>
                </FlexContainer>
            </FlexContainer>
            <FlexContainer
                gap="m"
                direction="column"
                overflow="nowrap"
                className={getBemClasses(styles, 'cards')}
            >
                <Input
                    className={getBemClasses(styles, 'search')}
                    value={title ?? ''}
                    onChange={event => setTitle(event.target.value)}
                    onBlur={event => setTitle(event.target.value.trim())}
                    startContent={<Search className={getBemClasses(styles, 'searchIcon')} />}
                />

                {isLoading ? <Loader /> : null}
                {data?.search_result.map(movie => (
                    <MovieCard
                        movie={movie}
                        className={getBemClasses(styles, 'card')}
                        actions={movie => <RateMovieButtons id={movie.id} />}
                        key={movie.id}
                    />))}

                {data?.search_result?.length === 0
                    ? <EmptyMovies />
                    : <FlexContainer direction="row" alignItems="center" gap="m">
                        <button className={getBemClasses(styles, 'pagButton')} onClick={toBack} disabled={Number(page) <= 1}>
                            <ArrowLeft className={getBemClasses(styles, 'pagButtonIcon')} />
                        </button>
                        <Text>
                            {page ?? 1}
                        </Text>
                        <button className={getBemClasses(styles, 'pagButton')} onClick={toNext} disabled={Number(page) >= (data?.total_pages ?? 1)}>
                            <ArrowRight className={getBemClasses(styles, 'pagButtonIcon')} />
                        </button>
                    </FlexContainer>
                }
            </FlexContainer>
        </FlexContainer>
    );
});
