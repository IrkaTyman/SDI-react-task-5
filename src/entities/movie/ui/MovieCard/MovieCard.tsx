import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { MovieRouteUrls } from '@views/movie';

import { BACKEND_HOST } from '@shared/config/redux/hosts';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Image, Text } from '@shared/ui';

import styles from './MovieCard.module.css';
import { ShortMovieInfo } from '../../model/ShortMovieInfo';

export type Props = ClassNameProps & TestProps & Readonly<{
    movie: ShortMovieInfo;
    actions: (movie: ShortMovieInfo) => ReactNode;
}>;

export const MovieCard: FC<Props> = typedMemo(function MovieCard({
    className,
    movie,
    actions,
    'data-testid': dataTestId = 'MovieCard',
}) {
    const navigate = useNavigate();

    return (
        <FlexContainer
            direction="row"
            alignItems="start"
            gap="l"
            onClick={() => navigate(MovieRouteUrls.Movie(movie.id))}
            overflow="nowrap"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Image
                alt={movie.title}
                src={`${BACKEND_HOST}static/images/${movie.id}`}
                className={getBemClasses(styles, 'avatar')}
            />

            <FlexContainer
                direction="column"
                gap="m"
                className={getBemClasses(styles, 'info')}
            >
                <Text className={getBemClasses(styles, 'title')}>
                    {movie.title}
                </Text>

                <FlexContainer
                    direction="column"
                    gap="s"
                >
                    <FlexContainer
                        direction="row"
                        overflow="nowrap"
                    >
                        <Text
                            className={getBemClasses(styles, 'paramName')}
                        >
                            Жанр
                        </Text>
                        <Text className={getBemClasses(styles, 'paramValue')}>
                            {movie.genre}
                        </Text>
                    </FlexContainer>
                    <FlexContainer
                        direction="row"
                        overflow="nowrap"
                    >
                        <Text
                            className={getBemClasses(styles, 'paramName')}
                        >
                            Год выпуска
                        </Text>
                        <Text className={getBemClasses(styles, 'paramValue')}>
                            {movie.release_year}
                        </Text>
                    </FlexContainer>
                    <FlexContainer
                        direction="row"
                        overflow="nowrap"
                    >
                        <Text
                            className={getBemClasses(styles, 'paramName')}
                        >
                            Описание
                        </Text>
                        <Text className={getBemClasses(styles, 'paramValue')}>
                            {movie.description}
                        </Text>
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>

            {actions(movie)}
        </FlexContainer>
    );
});
