import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.status = true;
      state.userData = action.payload; 
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { Login, logout } = authSlice.actions;
export default authSlice.reducer;

