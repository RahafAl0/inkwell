import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
  },
  setUser: (state, action) => {
    state.user = action.payload;
  },
  logout: (state) => {      
    state.user = null;
    state.token = null;
    },  
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;