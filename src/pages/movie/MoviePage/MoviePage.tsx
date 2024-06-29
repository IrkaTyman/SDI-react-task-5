import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './MoviePage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const MoviePage: FC<Props> = typedMemo(function MoviePage({
    className,
    'data-testid': dataTestId = 'MoviePage',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >

        </div>
    );
});
