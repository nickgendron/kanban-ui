import ReactDOM from "react-dom/client";
// import "../index.css";
import { persistor, store } from "./state/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { kanbanReduxApi } from "./api/ReduxApiHandler.js";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup.jsx";
import TeamPage from "./screens/TeamPage.jsx";
import KanbanBoardPage from "./screens/KanbanBoardPage.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PrivateRoutes><Navigate to="/"/></PrivateRoutes>} />
            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <Home />
                </PrivateRoutes>
              } />
            <Route
              path="/team"
              element={
                <PrivateRoutes>
                  <TeamPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/project"
              element={
                <PrivateRoutes>
                  <KanbanBoardPage />
                </PrivateRoutes>
              }
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}
