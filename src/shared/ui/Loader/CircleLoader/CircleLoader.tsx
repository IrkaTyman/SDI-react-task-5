import { FC, useMemo } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps } from '@shared/types';
import { ClassNameProps } from '@shared/types/ClassNameProps';

import styles from './CircleLoader.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
}>;

export const CircleLoader: FC<Props> = typedMemo(function CircleLoader({
    className,
}: Props) {
    return (
        <div className={getBemClasses(styles, null, null, className)} />
    );
});
