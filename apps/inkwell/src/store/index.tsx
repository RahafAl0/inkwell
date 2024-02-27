import { configureStore } from "@reduxjs/toolkit";
import authApi from "./apis/authApi";
import {articleApi} from "./apis/articleApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, articleApi.middleware),
});

export default store;