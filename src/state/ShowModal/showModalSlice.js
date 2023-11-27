import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

const showAddModalSlice = createSlice({
  name: "addNewCardModal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    hideModal: (state) => {
      state.showModal = false;
    },
  },
});

export const { toggleModal, hideModal } = showAddModalSlice.actions;
export const selectShowAddModal = (state) => state.showModalSlice;
export default showAddModalSlice.reducer;
