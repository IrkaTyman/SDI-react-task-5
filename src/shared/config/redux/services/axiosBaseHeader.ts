import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toast';

import { BACKEND_API_HOST } from '@shared/config/redux/hosts';
import { TokenService } from '@shared/lib';

export const axiosBaseQuery = (): BaseQueryFn<
    {
        url: string;
        method: AxiosRequestConfig['method'];
        body?: AxiosRequestConfig['data'];
    }
> => async ({ url, method, body }) => {
    try {
        const response = await axios({
            url: BACKEND_API_HOST + url,
            method,
            data: body,
            headers: { 'Authorization': `Bearer ${TokenService.getToken()}` },
        });
        const responseData = response.data;
        return { data: responseData };
    } catch (axiosError) {
        const err = axiosError as AxiosError;
        toast.error('Произошла ошибка');
        return { error: { status: err.response?.status, data: err.response?.data } };
    }
};
