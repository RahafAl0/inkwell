import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/api' }), 
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register', 
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
  
});


export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
export default authApi;
