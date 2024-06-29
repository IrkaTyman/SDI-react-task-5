import {FC} from 'react';

import {ClassNameProps, TestProps} from '@shared/types';
import {getBemClasses, typedMemo} from '@shared/lib';

import styles from './Login.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const Login: FC<Props> = typedMemo(function Login({
                                                             className,
                                                             'data-testid': dataTestId = 'Login',
                                                         }) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >

        </div>
    );
});
