import { Metadata } from 'next';

import '@shared/styles/index.css';

import { AppProvider } from './AppProvider';

export const metadata: Metadata = {
    title: 'Фильмопоиск',
    description: 'Сайт для поиска фильмов',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div id="root">
                    <AppProvider>
                        {children}
                    </AppProvider>
                </div>
            </body>
        </html>);
}
