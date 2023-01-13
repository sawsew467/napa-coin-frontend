import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import '../styles/globals.css';
import { Provider, useSelector } from 'react-redux';
import { State, store } from '../redux';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

export interface AppInterface {
    darkmode: string;
    currentUser: {
        _id: string;
        fullname: string;
        email: string;
        avatar: string;
        bio: string;
        following: string[];
        follower: string[];
    };
}

export const socket = io('http://localhost:5000');

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
