import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../redux';

export interface AppInterface {
    darkmode: string;
    currentUser: {
        fullname: string;
        email: string;
        avatar: string;
        bio: string;
    };
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
