import React from 'react';

import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import AppContextProvider from 'components/Providers/AppContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppContextProvider>
            <Component {...pageProps} />
        </AppContextProvider>
    );
}

export default appWithTranslation(MyApp);
