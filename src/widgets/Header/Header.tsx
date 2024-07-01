import { FC } from 'react';
import { Link } from 'react-router-dom';

import { MovieRouteUrls } from '@pages/movie';

import { Login } from '@features/login';
import { Logout } from '@features/logout';

import { User } from '@entities/user';

import { useIsAuthSelector } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './Header.module.css';

export type Props = ClassNameProps & TestProps;

export const Header: FC<Props> = typedMemo(function Header({
    className,
    'data-testid': dataTestId = 'Header',
}) {
    const isAuth = useIsAuthSelector();

    return (
        <FlexContainer
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Link to={MovieRouteUrls.Main}>
                <Text className={getBemClasses(styles, 'logo')}>
                    Фильмопоиск
                </Text>
            </Link>

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
