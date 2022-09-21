import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TODO: replace with env
const cryptoNewsHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Key': '673572aedemsh6d3ab43d052735ap17d24bjsne5f46619407b',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newCategory, count }) => ({
        url: `${baseUrl}/search`,
        headers: cryptoNewsHeaders,
        params: {
          q: newCategory,
          count: count,
          safeSearch: 'off',
          textFormat: 'Raw',
          freshness: 'Day',
          originalImg: true,
        },
      }),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
