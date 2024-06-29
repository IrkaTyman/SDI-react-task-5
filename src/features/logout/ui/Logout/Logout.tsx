import {FC} from 'react';

import {ClassNameProps, TestProps} from '@shared/types';
import {getBemClasses, typedMemo} from '@shared/lib';

import styles from './Logout.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const Logout: FC<Props> = typedMemo(function Logout({
                                                               className,
                                                               'data-testid': dataTestId = 'Logout',
                                                           }) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >

        </div>
    );
});
