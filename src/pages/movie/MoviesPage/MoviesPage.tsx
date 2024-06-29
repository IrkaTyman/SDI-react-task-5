import { FC } from 'react';

import { Header } from '@widgets/Header';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './MoviesPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const MoviesPage: FC<Props> = typedMemo(function MoviesPage({
    className,
    'data-testid': dataTestId = 'MoviesPage',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Header />
        </div>
    );
});
