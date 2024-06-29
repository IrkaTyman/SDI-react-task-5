export const GENRES_MAP = {
    comedy: 'комедия',
    drama: 'драма',
    action: 'боевик',
    thriller: 'триллер',
    horror: 'ужасы',
    family: 'семейный',
    cartoon: 'анимированный',
    fantasy: 'фэнтези',
    romance: 'романтика',
    adventure: 'приключения',
    musical: 'мьюзикл',
    war: 'военный',
} as const;

export type GenresEnglish = keyof typeof GENRES_MAP;
export type GenresRussian = typeof GENRES_MAP[GenresEnglish];
