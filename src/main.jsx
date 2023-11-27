import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { persistor, store } from "./state/store.js";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { kanbanReduxApi } from "./api/ReduxApiHandler.js";

import Router from "./routes/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ApiProvider api={kanbanReduxApi}> */}
        <RouterProvider router={Router} />
        {/* </ApiProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
