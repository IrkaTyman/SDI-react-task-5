import { FC, useEffect, useState } from 'react';

import Star from '@shared/assets/icons/Star.svg';
import StarFilled from '@shared/assets/icons/StarFilled.svg';
import { useAppDispatch } from '@shared/config/redux';
import { useRateMovieMutation } from '@shared/config/redux/services/movieService';
import { logout } from '@shared/config/redux/slices/authSlice';
import { useDebounceState, useIsAuthSelector } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Text } from '@shared/ui';

import styles from './RateMovieButtons.module.css';
import { RatingService } from '../../lib/RatingService';

export type Props = ClassNameProps & TestProps & Readonly<{
    id: string;
}>;

const TOTAL_STARS = 5;

export const RateMovieButtons: FC<Props> = typedMemo(function RateMovieButtons({
    id,
    className,
    'data-testid': dataTestId = 'RateMovieButtons',
}) {
    const isAuth = useIsAuthSelector();
    const dispatch = useAppDispatch();

    const [isHover, setIsHover] = useState(false);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [rating, setRating] = useState(RatingService.getRating(id));

    const debouncedRating = useDebounceState(rating, 300);
    const [rateServer] = useRateMovieMutation();

    useEffect(() => {
        const prevRating = RatingService.getRating(id);
        if (isAuth && prevRating !== debouncedRating) {
            rateServer({ movieId: id, userRate: debouncedRating })
                .unwrap()
                .catch(error => {
                    if (error.status === 401) {
                        dispatch(logout());
                    }
                    setRating(prevRating);
                });
            RatingService.setRating(id, debouncedRating);
        }
    }, [debouncedRating, rateServer, id, dispatch]);

    return (
        <div
            onMouseEnter={() => isAuth && setIsHover(true)}
            onMouseLeave={() => isAuth && setIsHover(false)}
            className={getBemClasses(styles, null, { disabled: !isAuth }, className)}
            data-testid={dataTestId}
            onClick={event => event.stopPropagation()}
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
                                        { isActive: currentRating <= rating },
                                    )}
                                />
                                : <Star
                                    className={getBemClasses(
                                        styles,
                                        'star',
                                        { isActive: currentRating <= rating },
                                    )}
                                />
                        }
                        <Text className={getBemClasses(styles, 'ratingText', { isActive: currentRating <= rating })}>
                            {currentRating}
                        </Text>
                    </label>
                );
            })}
        </div>
    );
});
