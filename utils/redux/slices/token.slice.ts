import { createSlice } from '@reduxjs/toolkit';

const initialState = { code: null, exp: 0 };

const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {
    setToken: (state: any, action) => {
      state[action.payload.field] = action.payload.value;
    },
    removeToken: (state) => {
      state.code = initialState.code;
      state.exp = initialState.exp;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;
export const selectToken = (state: any) => state.token;

export default tokenSlice.reducer;
