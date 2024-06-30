import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Text } from '@shared/ui';

import styles from './SelectEmpty.module.css';

export type Props = ClassNameProps & TestProps;

export const SelectEmpty: FC<Props> = typedMemo(function SelectEmpty({
    className,
    'data-testid': dataTestId = 'SelectEmpty',
}) {
    return (
        <Text
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            Нет подходящих данных
        </Text>
    );
});
