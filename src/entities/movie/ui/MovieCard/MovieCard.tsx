import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './MovieCard.module.css';
import { ShortMovieInfo } from '../../model/ShortMovieInfo';

export type Props = ClassNameProps & TestProps & Readonly<{
    movie: ShortMovieInfo;
}>;

export const MovieCard: FC<Props> = typedMemo(function MovieCard({
    className,
    'data-testid': dataTestId = 'MovieCard',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >

        </div>
    );
});
