//! This API use CoinGecko API via rapidapi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const exchangesHeaders = {
  'X-RapidAPI-Key': '673572aedemsh6d3ab43d052735ap17d24bjsne5f46619407b',
  'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
};

const baseUrl = 'https://coingecko.p.rapidapi.com';

export const cryptoExchangeApi = createApi({
  reducerPath: 'cryptoExchangeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => ({
        url: `${baseUrl}/exchanges`,
        headers: exchangesHeaders,
      }),
    }),
  }),
});

export const { useGetExchangesQuery } = cryptoExchangeApi;
