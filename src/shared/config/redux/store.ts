import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { authService } from './services/authService';
import { movieService } from './services/movieService';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [authService.reducerPath]: authService.reducer,
        [movieService.reducerPath]: movieService.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            authService.middleware,
            movieService.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
