import './styles/index.css';

import { AppRouter } from './providers/router/AppRouter';

import '@shared/styles/index.css';
import { Header } from '@widgets/Header';

const App = () => {
    return (
        <>
            <Header />
            <AppRouter />
        </>);
};

export default App;
