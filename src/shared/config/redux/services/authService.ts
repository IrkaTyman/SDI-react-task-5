import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginParams } from '@features/login/model/LoginParams';

import { authHeader } from './authHeader';

// Building api for authentication
export const authService = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery(authHeader()),
    // building the endpoints
    endpoints: builder => ({
        login: builder.query<LoginParams, {token: string}>({
            query: credentials => ({
                url: 'login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
});

// Auto generated hook - starts with use & ends on mutation
export const { useLoginQuery } = authService;
