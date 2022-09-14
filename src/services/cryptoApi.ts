import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TODO: replace with env
const cryptoApiHeaders = {
  'X-RapidAPI-Key': '673572aedemsh6d3ab43d052735ap17d24bjsne5f46619407b',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

//Create Api take an object with the following
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi', //will be use in the store to define the key of the reducer slice
  baseQuery: fetchBaseQuery({ baseUrl }), // similar to fetch API
  //each case of builder will be a method or different call to the api we want to call
  endpoints: (builder) => ({
    //Example of GET request, the query need to be a function which return an object contain the final API endpoint and related options to be called
    getCryptos: builder.query({
      query: (count: number = 10) => ({
        url: `${baseUrl}/coins`,
        params: { limit: count },
        headers: cryptoApiHeaders,
      }),
    }),
    // Api call to get info about specific coin with coin id
    getCryptoDetail: builder.query({
      query: ({ coinId, timePeriod }) => ({
        url: `${baseUrl}/coin/${coinId}`,
        headers: cryptoApiHeaders,
        params: {
          timePeriod,
        },
      }),
    }),
  }),
});
//RTK will automatically generate these hook to refer to our call based on the name we given in the builder method
export const { useGetCryptosQuery, useGetCryptoDetailQuery } = cryptoApi;
