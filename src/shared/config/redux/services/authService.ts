import { createApi } from '@reduxjs/toolkit/query/react';

import { LoginParams } from '@features/login/model/LoginParams';

import { axiosBaseQuery } from './axiosBaseHeader';

export const authService = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
    endpoints: builder => ({
        login: builder.mutation<{token: string}, LoginParams>({
            query: credentials => ({
                url: 'login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
});

// Auto generated hook - starts with use & ends on mutation
export const { useLoginMutation } = authService;
