import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';

import '@shared/config/i18n';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';

import { Provider } from 'react-redux';

import { store } from '@shared/config/redux';

import { ToastContainer } from 'react-toast';

const root = createRoot(document.getElementById('root')!);
root.render(
    <ErrorBoundary>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <div id="modal-portal" />

                <ToastContainer />
            </BrowserRouter>
        </Provider>
    </ErrorBoundary>,
);
