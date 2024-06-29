import {FC} from 'react';

import {ClassNameProps, TestProps} from '@shared/types';
import {getBemClasses, typedMemo} from '@shared/lib';

import styles from './User.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const User: FC<Props> = typedMemo(function User({
                                                           className,
                                                           'data-testid': dataTestId = 'User',
                                                       }) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >

        </div>
    );
});
