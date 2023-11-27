import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = {
  boardId: null,
};

const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  reducers: {
    setActiveBoard: (state, action) => {
      console.log(action.payload);
      state.boardId = action.payload;
      // sessionStorage.setItem("board", action.payload)
    },
    // updateColumnsInBoard: (state, action) => {
    //   state.board.columns = action.payload;
    //   console.log(state.board.columns);
    // },

    // updateCardInBoard: (state, action) => {
    //   const updatedCard = action.payload;
    //   if (!state.board) {
    //     return state;
    //   }
    //   const { containerId, cardId } = updatedCard;
    //   const updatedColumns = { ...state.board.columns };

    //   if (!updatedColumns[containerId]) {
    //     return state;
    //   }

    //   const updatedCards = updatedColumns[containerId].cards.map((card) =>
    //     card.cardId === cardId ? updatedCard : card
    //   );

    //   state.board = {
    //     ...state.board,
    //     columns: {
    //       ...updatedColumns,
    //       [containerId]: {
    //         ...updatedColumns[containerId],
    //         cards: updatedCards,
    //       },
    //     },
    //   };
    //   console.log(state.board);
    // },
    // addCardToColumn: (state, action) => {
    //   console.log(action.payload);
    //   // const { containerId, newCard } = action.payload;
    //   const containerId = action.payload.containerId;
    //   const newCard = action.payload;
    //   console.log(newCard);
    //   if (!state.board || !state.board.columns[containerId]) {
    //     return state;
    //   }

    //   const updatedColumns = { ...state.board.columns };
    //   const updatedCards = [...state.board.columns[containerId].cards, newCard];
    //   console.log(updatedCards);
    //   state.board = {
    //     ...state.board,
    //     columns: {
    //       ...updatedColumns,
    //       [containerId]: {
    //         ...state.board.columns[containerId],
    //         cards: updatedCards,
    //       },
    //     },
    //   };
    //   console.log(state.board);
    // },
    // addColumnToBoard: (state, action) => {
    //   const columnName = action.payload;
    //   console.log(columnName);
    //   // Generate a new columnId
    //   const newColumnId = uuid();

    //   // Create a new column object
    //   const newColumn = {
    //     name: columnName,
    //     cards: [],
    //   };

    //   // Add the new column to the state
    //   state.board.columns = {
    //     ...state.board.columns,
    //     [newColumnId]: newColumn,
    //   };
    //   console.log(state.board.columns);
    // },
  },
});

export const {
  setActiveBoard,
  // updateCardInBoard,
  // updateColumnsInBoard,
  // addCardToColumn,
  // addColumnToBoard,
} = activeBoardSlice.actions;

export default activeBoardSlice.reducer;
