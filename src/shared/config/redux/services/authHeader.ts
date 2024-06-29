import { FetchBaseQueryArgs } from '@reduxjs/toolkit/query';

import { TokenService } from '@shared/lib';

export const authHeader = (): FetchBaseQueryArgs => {
    return {
        baseUrl: 'https://localhost:3030/api/v1/',
        credentials: 'omit', // it will bypass CORS
        prepareHeaders: (headers: Headers) => {
            const token = TokenService.getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    };
};
