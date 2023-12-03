import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  card: "null",
};

const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    setActiveCard: (state, action) => {
      //
      //
      state.card = action.payload;
    },
    removeActiveCard: (state) => {
      state.card = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, () => {})
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.value += action.payload;
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

export const { setActiveCard, removeActiveCard } = activeCardSlice.actions;

export default activeCardSlice.reducer;
