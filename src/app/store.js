import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {cryptoApi} from '../services/cryptoApi';
import {cryptoNews} from '../services/cryptoNews';

// create store
export const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNews.reducerPath]: cryptoNews.reducer
    },
    // for caching
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptoNews.middleware),
});

// refetching on focus, refetching on reconnect
setupListeners(store.dispatch);