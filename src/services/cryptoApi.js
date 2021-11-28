import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

/*
    env-cmd (dependency)
    .env.development (file where credentials are saved)
    "scripts": {
        "start": "env-cmd -f .env.development craco start",
    }
*/
const API_KEY = process.env.REACT_APP_API_KEY;

const cryptoApiHeader = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': `${API_KEY}`
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoApiHeader});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi', // unique key that defines redux store where to store caches.
    baseQuery: fetchBaseQuery({baseUrl}), // url
    endpoints: (builder) => ({ // end points of url define here
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`),
        }),
    })
});

export const {useGetCryptosQuery, useGetExchangesQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi; // import in other files and use as hook {everything starts wih 'use' reflects it's a hook}