import { FC, useMemo, useState } from 'react';

import { Header } from '@widgets/Header';

import { RateMovieButtons } from '@features/rate-movie';

import { GENRES_MAP, MovieParams } from '@entities/movie';
import { YEARS } from '@entities/movie/model/Years';
import { MovieCard } from '@entities/movie/ui/MovieCard';

import Search from '@shared/assets/icons/Search.svg';
import { useGetMoviesQuery } from '@shared/config/redux/services/movieService';
import { useDebounceState } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Input, renderOption, Select, SelectItem, Text } from '@shared/ui';

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
    const [search, setSearch] = useState('');
    const debounceSearch = useDebounceState(search, 300);

    const [selectedGenres, setSelectedGenres] = useState<SelectItem<string>[]>([genresOptions[0]]);
    const [selectedYears, setSelectedYears] = useState<SelectItem<string>[]>([yearsOptions[0]]);

    const params = useMemo<MovieParams>(() => ({
        title: debounceSearch,
        releaseYear: selectedYears[0]?.value === '0' ? undefined : selectedYears[0]?.value ?? undefined,
        genre: selectedGenres[0]?.value === '0' ? undefined : selectedGenres[0]?.value ?? undefined,
    }), [debounceSearch, selectedGenres, selectedYears]);

    const { data, isLoading } = useGetMoviesQuery(params);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Header />
            <FlexContainer
                className={getBemClasses(styles, 'content')}
                direction="row"
                overflow="nowrap"
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
                            onSelect={setSelectedGenres}
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
                            onSelect={setSelectedYears}
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
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        onBlur={event => setSearch(event.target.value.trim())}
                        startContent={<Search className={getBemClasses(styles, 'searchIcon')} />}
                    />

                    {data?.search_result.map(movie => (
                        <MovieCard
                            movie={movie}
                            className={getBemClasses(styles, 'card')}
                            actions={movie => <RateMovieButtons rating={Number(movie.rating)} />}
                            key={movie.id}
                        />))}
                </FlexContainer>
            </FlexContainer>
        </div>
    );
});
