import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.REACT_APP_API_KEY;

const cryptoNewsHeader = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': `${API_KEY}`
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoNewsHeader});

export const cryptoNews = createApi({
    reducerPath: 'cryptoNews',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
});

export const {useGetCryptoNewsQuery} = cryptoNews;