// commentApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAccessToken = () => {
  return localStorage.getItem('token');
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333/api',
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery,
  endpoints: (builder) => ({
    fetchComments: builder.query({
      query: () => 'comments',
    }),
    createComment: builder.mutation({
      query: (newComment) => ({
        url: 'comments',
        method: 'POST',
        body: newComment,
      }),
    }),
    // Add other endpoints for updating and deleting comments
  }),
});

export const { useFetchCommentsQuery, useCreateCommentMutation } = commentApi;
export default commentApi;
