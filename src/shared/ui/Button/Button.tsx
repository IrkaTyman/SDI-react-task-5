import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode, useMemo } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';
import { Loader } from '@shared/ui/Loader';

import styles from './Button.module.css';

export type Props = TestProps
    & ClassNameProps
    & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & Readonly<{
    /**
     * Находится ли кнопка в состоянии загрузки
     */
    isLoading?: boolean;

    /**
     * Контент кнопки при загрузке
     */
    loader?: string;

    /**
     * Вариант вида кнопки
     * @default 'solid'
     */
    variant?: 'solid' | 'bordered';

    /**
     * Цвет кнопки
     * @default 'primary'
     */
    color?: 'primary' | 'danger';
}>;
/**
 * Кнопка.
 */
export const Button = typedMemo(forwardRef<HTMLButtonElement, Props>(function Button({
    color = 'primary',
    variant = 'solid',
    type = 'button',
    disabled,
    isLoading,
    ...props
}: Props, ref) {
    const ContentComponent = useMemo((): ReactNode => {
        return isLoading
            ? <FlexContainer
                direction="row"
                alignItems="center"
                gap="xs"
                overflow="nowrap"
            >
                <Loader variant={'circle'} size={14} className={getBemClasses(styles, 'loader')} />
                {props.loader ?? 'Загрузка...'}
            </FlexContainer>
            : props.children;
    }, [isLoading, props]);

    return (
        <button
            {...props}
            type={type}
            ref={ref}
            className={
                getBemClasses(
                    styles,
                    null,
                    { disabled, variant, color, isLoading },
                    props.className,
                )
            }
            disabled={disabled}
        >
            {ContentComponent}
        </button>
    );
}));
