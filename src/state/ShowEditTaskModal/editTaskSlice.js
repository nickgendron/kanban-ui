import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

const showEditTaskSlice = createSlice({
  name: "showEditTask",
  initialState,
  reducers: {
    toggleEditModal: (state) => {
      state.showModal = !state.showModal;
    },
    hideEditModal: (state) => {
      state.showModal = false;
    },
  },
});

export const { toggleEditModal, hideEditModal } = showEditTaskSlice.actions;

export default showEditTaskSlice.reducer;
