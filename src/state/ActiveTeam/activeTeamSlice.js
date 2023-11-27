import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: null,
};

const activeTeamSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    setActiveTeam: (state, action) => {
        console.log("here")
        // console.log("setActiveCard", action.payload);
      state.team = action.payload;
      console.log(state.team)
    },
    removeActiveTeam: (state) => {
      state.team = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, () => {
        console.log("incrementAsync.pending");
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.team += action.payload;
      });
  },
});

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

export const { setActiveTeam, removeActiveTeam } = activeTeamSlice.actions;

export default activeTeamSlice.reducer;
