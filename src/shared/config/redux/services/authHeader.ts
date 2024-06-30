import { FetchBaseQueryArgs } from '@reduxjs/toolkit/query';

import { BACKEND_API_HOST } from '@shared/config/axios/host';
import { TokenService } from '@shared/lib';

export const authHeader = (): FetchBaseQueryArgs => {
    return {
        baseUrl: BACKEND_API_HOST,
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
