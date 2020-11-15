import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const slice = createSlice({
  name: 'login',
  initialState: {
    token: null,
    error: null,
    loading: false,
    role: null,
  },
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload.error;
      state.token = null;
      state.role = null;
      state.loading = false;
    },
    logout: (state) => {
      state.error = null;
      state.token = null;
      Cookies.remove('jwt');
      Cookies.remove('role');
    }
  }
});

export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
} = slice.actions;

export default slice.reducer;
