import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null,
    token: null
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false; 
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    lodaing: false,
    error: null,
    isAuthenticated: false,
    user: null,
    token: null,
  },
  reducers: {
    registerStart: (state) => {
      state.lodaing = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.lodaing = false;
      state.isAuthenticated = true;
      state.token = action.payload
    },
    registerFail: (state, action) => {
      state.lodaing = false;
      state.error = action.payload;
    }
  }
});


export const {loginStart, loginSuccess, loginFail, logout} = loginSlice.actions;
export const {registerStart, registerSuccess, registerFail} = registerSlice.actions;
export default loginSlice.reducer;