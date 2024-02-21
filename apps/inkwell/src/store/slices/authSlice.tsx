import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null
  },
  reducers: {
    loginStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    lodaing: false,
    error: null
  },
  reducers: {
    registerStart: (state, action) => {
      state.lodaing = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.lodaing = false;
    },
    registerFail: (state, action) => {
      state.lodaing = false;
      state.error = action.payload;
    }
  }
});


export const {loginStart, loginSuccess, loginFail} = loginSlice.actions;
export const {registerStart, registerSuccess, registerFail} = registerSlice.actions;
export default loginSlice.reducer;