'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toast';

import { Header } from '@widgets/Header';

import { store } from '@shared/config/redux';

type Props = PropsWithChildren;

export const AppProvider = ({
    children,
}: Props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Header />

                {children}
                <div id="modal-portal" />
                <ToastContainer />
            </Provider>
        </BrowserRouter>);
};
