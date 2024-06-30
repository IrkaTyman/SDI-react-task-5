import { FC, useCallback, useEffect, useState } from 'react';

import { Actor } from '@entities/movie';

import ArrowLeft from '@shared/assets/icons/ArrowLeft.svg';
import ArrowRight from '@shared/assets/icons/ArrowRight.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Image, Text } from '@shared/ui';

import styles from './ActorsCarousel.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    actors: Actor[];
}>;

export const ActorsCarousel: FC<Props> = typedMemo(function ActorsCarousel({
    className,
    actors,
    'data-testid': dataTestId = 'ActorsCarousel',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <ul className={getBemClasses(styles, 'carousel')}>
                {actors.map((actor, index) =>
                    (<li className={getBemClasses(styles, 'actor')}>
                        <Image alt={actor.name} src={actor.photo} className={getBemClasses(styles, 'actorAvatar')} />
                        <Text className={getBemClasses(styles, 'actorName')}>
                            {actor.name}
                        </Text>
                    </li>),
                )}
            </ul>
        </div>
    );
});
