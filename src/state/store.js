import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import { kanbanReduxApi } from "../api/ReduxApiHandler";
import activeCardReducer from "./ActiveCard/activeCardSlice";
import showAddModalSlice from "./ShowModal/showModalSlice";
import showEditTaskSlice from "./ShowEditTaskModal/editTaskSlice";
import activeBoardSlice from "./ActiveBoard/activeBoardSlice";
import counterSliceReducer from "./counterSlice";
import activeTeamSlice from "./ActiveTeam/activeTeamSlice";
import userStateSlice from "./UserState/userStateSlice";
// const peresistConfig = {
//   key: "root",
//   storage,
// };


// const persistedReducer = persistReducer(peresistConfig, activeTeamSlice);
// export const store = configureStore({
//   reducer: {
//     [kanbanReduxApi.reducerPath]: kanbanReduxApi.reducer, // Include the RTK Query reducer

//     activeCard: activeCardReducer,
//     // showAddModal: showAddModalSlice,
//     // showEditTask: showEditTaskSlice,
//     // activeBoard: activeBoardSlice,
//     activeTeam: activeTeamSlice,
//     activeBoard: persistedReducer,
//     counter: counterSliceReducer,

//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(kanbanReduxApi.middleware),
//   devTools: true,
// });
const rootReducer = combineReducers({
  [kanbanReduxApi.reducerPath]: kanbanReduxApi.reducer,
  activeCard: activeCardReducer,
  activeTeam: activeTeamSlice,
  activeBoard: activeBoardSlice,
  counter: counterSliceReducer,
  userState: userStateSlice,
});

// Configure persistence for the root reducer
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['activeBoard', 'activeTeam', "userState"], // List of slices to persist
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kanbanReduxApi.middleware),
});
export const persistor = persistStore(store);
