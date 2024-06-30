import { FC, useEffect, useMemo, useState } from 'react';

import { Header } from '@widgets/Header';

import { RateMovieButtons } from '@features/rate-movie';

import { GENRES_MAP, MovieParams } from '@entities/movie';
import { YEARS } from '@entities/movie/model/Years';
import { MovieCard } from '@entities/movie/ui/MovieCard';

import Search from '@shared/assets/icons/Search.svg';
import { useGetMoviesQuery } from '@shared/config/redux/services/movieService';
import { useDebounceState, useSearchParamState } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Input, Loader, renderOption, Select, SelectItem, Text } from '@shared/ui';

import { EmptyMovies } from './EmptyMovies';
import styles from './MoviesPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

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
    'data-testid': dataTestId = 'MoviesPage',
}) {
    const [title, setTitle] = useSearchParamState('title');
    const debounceSearch = useDebounceState(title, 300);

    const [selectedGenreId, setSelectedGenreId] = useSearchParamState('genre');
    const [selectedYearId, setSelectedYearId] = useSearchParamState('year');

    const [selectedGenres, setSelectedGenres] = useState<SelectItem<string>[]>(genresOptions.filter(genre => genre.value === (selectedGenreId ?? '0')));
    const [selectedYears, setSelectedYears] = useState<SelectItem<string>[]>(yearsOptions.filter(year => year.value === (selectedYearId ?? '0')));

    const params = useMemo<MovieParams>(() => ({
        title: debounceSearch ?? undefined,
        releaseYear: selectedYears[0]?.value === '0' ? undefined : selectedYears[0]?.value ?? undefined,
        genre: selectedGenres[0]?.value === '0' ? undefined : selectedGenres[0]?.value ?? undefined,
    }), [debounceSearch, selectedGenres, selectedYears]);
    const { data, isLoading } = useGetMoviesQuery(params);

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

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer
                className={getBemClasses(styles, 'content')}
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
                    {data?.search_result?.length === 0 && <EmptyMovies />}
                </FlexContainer>
            </FlexContainer>
        </div>
    );
});
