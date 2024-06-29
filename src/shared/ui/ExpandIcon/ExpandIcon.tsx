import { FC } from 'react';

import ArrowSquareUp from '@shared/assets/icons/ArrowSquareUp.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './ExpandIcon.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    /**
     * Состояние элемента
     */
    isExpanded: boolean;

    /**
     * Направление элемента при раскрытом состоянии
     */
    expandedDirection?: 'right' | 'left' | 'up' | 'down';

    /**
     * Направление элемента при закрытом состоянии
     */
    closedDirection?: 'right' | 'left' | 'up' | 'down';
}>;

/**
 * Иконка показателя закрыто/раскрыто с возможностью изменения положения
 */
export const ExpandIcon: FC<Props> = typedMemo(function ExpandIcon({
    isExpanded,
    expandedDirection = 'down',
    closedDirection = 'right',
    className,
    'data-testid': dataTestId = 'ExpandIcon',
}: Props) {
    return (
        <ArrowSquareUp
            className={
                getBemClasses(
                    styles,
                    null,
                    { expandedDirection, closedDirection, isExpanded },
                    className,
                )
            }
            data-testid={dataTestId}
        />
    );
});
