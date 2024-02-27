import { createSlice } from "@reduxjs/toolkit"; 

const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchArticlesStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchArticlesSuccess: (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    },
    fetchArticlesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchArticlesStart, fetchArticlesSuccess, fetchArticlesFail } =
  articleSlice.actions;
export default articleSlice.reducer;