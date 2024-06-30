import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RateMovieButtons.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const RateMovieButtons: FC<Props> = typedMemo(function RateMovieButtons({
    className,
    'data-testid': dataTestId = 'RateMovieButtons',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >

        </div>
    );
});
