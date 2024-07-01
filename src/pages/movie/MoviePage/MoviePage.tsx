import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { RateMovieButtons } from '@features/rate-movie';

import { BACKEND_HOST } from '@shared/config/redux/hosts';
import { useGetMovieQuery } from '@shared/config/redux/services/movieService';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Image, Loader, Text } from '@shared/ui';

import { ActorsCarousel } from './ActorsCarousel';
import styles from './MoviePage.module.css';

export type Props = ClassNameProps & TestProps;

export const MoviePage: FC<Props> = typedMemo(function MoviePage({
    className,
}) {
    const { id } = useParams();
    const { data: movie, isLoading } = useGetMovieQuery(id ?? '');

    if (isLoading) {
        return <Loader />;
    }
    if (!movie) {
        return null;
    }
    return (
        <FlexContainer
            className={getBemClasses(styles, null, null, className)}
            direction="column"
            overflow="nowrap"
            gap="l"
        >
            <FlexContainer
                direction="row"
                alignItems="start"
                gap="xl"
                className={getBemClasses(styles, 'card')}
            >
                <Image
                    alt={movie.title}
                    src={`${BACKEND_HOST}static/images/${id}`}
                    className={getBemClasses(styles, 'avatar')}
                />

                <FlexContainer
                    direction="column"
                    gap="m"
                    className={getBemClasses(styles, 'info')}
                >

                    <FlexContainer
                        direction="row"
                        alignItems="start"
                        gap="m"
                        justifyContent="space-between"
                    >
                        <Text className={getBemClasses(styles, 'title')}>
                            {movie.title}
                        </Text>

                        <RateMovieButtons id={movie.id} />
                    </FlexContainer>

                    <FlexContainer
                        direction="column"
                        gap="s"
                    >
                        <FlexContainer
                            direction="row"
                            gap="xs"
                            overflow="nowrap"
                        >
                            <Text
                                className={getBemClasses(styles, 'paramName')}
                            >
                                    Жанр:
                            </Text>
                            <Text className={getBemClasses(styles, 'paramValue')}>
                                {movie.genre}
                            </Text>
                        </FlexContainer>
                        <FlexContainer
                            direction="row"
                            gap="xs"
                            overflow="nowrap"
                        >
                            <Text
                                className={getBemClasses(styles, 'paramName')}
                            >
                                    Год выпуска:
                            </Text>
                            <Text className={getBemClasses(styles, 'paramValue')}>
                                {movie.release_year}
                            </Text>
                        </FlexContainer>
                        <FlexContainer
                            direction="row"
                            gap="xs"
                            overflow="nowrap"
                        >
                            <Text
                                className={getBemClasses(styles, 'paramName')}
                            >
                                    Рейтинг:
                            </Text>
                            <Text className={getBemClasses(styles, 'paramValue')}>
                                {movie.rating}
                            </Text>
                        </FlexContainer>
                        <FlexContainer
                            direction="row"
                            gap="xs"
                            overflow="nowrap"
                        >
                            <Text
                                className={getBemClasses(styles, 'paramName')}
                            >
                                    Описание:
                            </Text>
                            <Text className={getBemClasses(styles, 'paramValue')}>
                                {movie.description}
                            </Text>
                        </FlexContainer>
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>

            <ActorsCarousel actors={movie.actors} />
        </FlexContainer>
    );
});
