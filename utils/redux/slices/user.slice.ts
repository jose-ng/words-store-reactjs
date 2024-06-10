import { createSlice } from '@reduxjs/toolkit';
const initialState = { isLoggedIn: false };

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = userSlice.actions;
export const selectUserLoggedIn = (state: any) => state.user.isLoggedIn;

export default userSlice.reducer;
