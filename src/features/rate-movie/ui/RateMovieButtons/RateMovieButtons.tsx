import { FC, useState } from 'react';

import Star from '@shared/assets/icons/Star.svg';
import StarFilled from '@shared/assets/icons/StarFilled.svg';
import { useAppSelector } from '@shared/config/redux';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './RateMovieButtons.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    rating: number;
}>;

const TOTAL_STARS = 5;

export const RateMovieButtons: FC<Props> = typedMemo(function RateMovieButtons({
    rating: innerRating,
    className,
    'data-testid': dataTestId = 'RateMovieButtons',
}) {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const [isHover, setIsHover] = useState(false);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [rating, setRating] = useState(innerRating);

    return (
        <div
            onMouseEnter={() => isAuth && setIsHover(true)}
            onMouseLeave={() => isAuth && setIsHover(false)}
            className={getBemClasses(styles, null, { disabled: !isAuth }, className)}
            data-testid={dataTestId}
        >
            {[...Array(TOTAL_STARS)].map((star, index) => {
                const currentRating = index + 1;

                return (
                    <label
                        onMouseEnter={() => isAuth && setHoverRating(currentRating)}
                        onMouseLeave={() => isAuth && setHoverRating(null)}
                        key={index}
                        className={getBemClasses(styles, 'rating')}
                    >
                        <input
                            key={star}
                            type="radio"
                            name="rating"
                            disabled={!isAuth}
                            className={getBemClasses(styles, 'input')}
                            checked={currentRating === rating}
                            value={currentRating}
                            onChange={() => setRating(currentRating)}
                        />
                        {
                            currentRating <= (hoverRating ?? 0) ||
                                (currentRating <= rating && !isHover)
                                ? <StarFilled
                                    className={getBemClasses(
                                        styles,
                                        'star',
                                        { isActive: currentRating < rating },
                                    )}
                                />
                                : <Star
                                    className={getBemClasses(
                                        styles,
                                        'star',
                                        { isActive: currentRating < rating },
                                    )}
                                    onMouseEnter={() => setHoverRating(currentRating)}
                                    onMouseLeave={() => setHoverRating(null)}
                                />
                        }
                        <Text className={getBemClasses(styles, 'ratingText', { isActive: currentRating < rating })}>
                            {currentRating}
                        </Text>
                    </label>
                );
            })}
        </div>
    );
});
