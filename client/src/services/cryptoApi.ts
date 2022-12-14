import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8000';

//Create Api take an object with the following
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi', //will be use in the store to define the key of the reducer slice
  baseQuery: fetchBaseQuery({ baseUrl }), // similar to fetch API
  //each case of builder will be a method or different call to the api we want to call
  endpoints: (builder) => ({
    //Example of GET request, the query need to be a function which return an object contain the final API endpoint and related options to be called
    getCryptos: builder.query({
      query: (count: number) => ({
        url: `${baseUrl}/get-crypto`,
        params: { limit: count },
      }),
    }),
    // Api call to get info about specific coin with coin id
    getCryptoDetail: builder.query({
      query: ({ coinId }) => ({
        url: `${baseUrl}/get-crypto/${coinId}`,
      }),
    }),
    //Get crypto history base on id
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => ({
        url: `${baseUrl}/get-crypto/${coinId}/history`,
        params: {
          timePeriod,
        },
      }),
    }),
  }),
});
//RTK will automatically generate these hook to refer to our call based on the name we given in the builder method
export const {
  useGetCryptosQuery,
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
