import './styles/index.css';
import { useTranslation } from 'react-i18next';

import { AppRouter } from './providers/router/AppRouter';
import '@shared/styles/index.css';

const App = () => {
    return <AppRouter />;
};

export default App;
