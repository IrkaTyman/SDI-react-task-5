import { FC } from 'react';

import Person from '@shared/assets/icons/Person.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './User.module.css';

export type Props = ClassNameProps & TestProps;

export const User: FC<Props> = typedMemo(function User({
    className,
    'data-testid': dataTestId = 'User',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Person className={getBemClasses(styles, 'icon')} />
        </div>
    );
});
