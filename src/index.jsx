import ReactDOM from "react-dom/client";
import "./index.css";
import { persistor, store } from "./state/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { kanbanReduxApi } from "./api/ReduxApiHandler.js";
// import Router from "./routes/Router.jsx";
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Navigate,
  Route,
  Routes,
  Router,
  Outlet,
} from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import App from "./App.jsx";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup.jsx";
import TeamPage from "./screens/TeamPage.jsx";
import KanbanBoardPage from "./screens/KanbanBoardPage.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(<App />);
