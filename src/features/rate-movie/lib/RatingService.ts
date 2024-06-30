export namespace RatingService {
    function getRatingKey(movieId: string) {
        return `movie_${movieId}_rating`;
    }
    export function getRating(movieId: string) {
        const rating = localStorage.getItem(getRatingKey(movieId));

        return rating ? Number(rating) : 0;
    }

    export function setRating(movieId: string, rating: number) {
        localStorage.setItem(getRatingKey(movieId), String(rating));
    }
}
