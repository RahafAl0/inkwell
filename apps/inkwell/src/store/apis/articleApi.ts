import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAccessToken = () => {
  return localStorage.getItem('token');
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333/api',
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.append('Authorization', `Bearer ${token}` ) ;
    }
    return headers;
  },
});

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery,
  endpoints: (builder) => ({
    createArticle: builder.mutation({
      query: (newArticle) => ({
        url: '/articles',
        method: 'POST',
        body: newArticle,
      }),
    }),
  }),
});


export const { useCreateArticleMutation } = articleApi;
export default articleApi;
