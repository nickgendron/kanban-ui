import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
};

const userStateSlice = createSlice({
  name: "useState",
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.authenticated = true;
    },
    setNotAuthenticated: (state) => {
      state.authenticated = false;
    },
  },
});

export const { setAuthenticated, setNotAuthenticated } = userStateSlice.actions;
export default userStateSlice.reducer;
