import { FC, useCallback } from 'react';

import { useAppDispatch } from '@shared/config/redux';
import { logout as logoutDispatch } from '@shared/config/redux/slices/authSlice';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button } from '@shared/ui';

import styles from './Logout.module.css';

export type Props = ClassNameProps & TestProps;

export const Logout: FC<Props> = typedMemo(function Logout({
    className,
    'data-testid': dataTestId = 'Logout',
}) {
    const dispatch = useAppDispatch();
    const logout = useCallback(() => dispatch(logoutDispatch()), []);

    return (
        <Button
            onClick={logout}
            variant="bordered"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            Выйти
        </Button>
    );
});
