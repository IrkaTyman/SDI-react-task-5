import { FC } from 'react';

import { Login } from '@features/login';
import { Logout } from '@features/logout';

import { User } from '@entities/user';

import { useAppSelector } from '@shared/config/redux';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './Header.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const Header: FC<Props> = typedMemo(function Header({
    className,
    'data-testid': dataTestId = 'Header',
}) {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    return (
        <FlexContainer
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Text className={getBemClasses(styles, 'logo')}>
                Фильмопоиск
            </Text>

            <FlexContainer
                direction="row"
                alignItems="center"
                gap="m"
            >
                {isAuth ? <User /> : null}
                {
                    isAuth ? <Logout /> : <Login />
                }
            </FlexContainer>
        </FlexContainer>
    );
});
