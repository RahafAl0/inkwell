import { configureStore } from "@reduxjs/toolkit";
import authApi from "./apis/authApi";
import {articleApi} from "./apis/articleApi";
import { commentApi } from "./apis/commentApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, articleApi.middleware, commentApi.middleware),
});

export default store;