import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toast';

import { ErrorBoundary } from '@app/providers/ErrorBoundary';

import { store } from '@shared/config/redux';

import App from './app/App';

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
