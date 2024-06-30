import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './EmptyMovies.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const EmptyMovies: FC<Props> = typedMemo(function EmptyMovies({
    className,
    'data-testid': dataTestId = 'EmptyMovies',
}) {
    return (
        <FlexContainer
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer
                direction="column"
                alignItems="center"
                gap="xs"
            >
                <Text className={getBemClasses(styles, 'title')}>
        Фильмы не найдены
                </Text>
                <Text className={getBemClasses(styles, 'subtitle')}>
                    Измените запрос и попробуйте снова
                </Text>
            </FlexContainer>
        </FlexContainer>
    );
});
