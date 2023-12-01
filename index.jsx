import ReactDOM from "react-dom/client";
import "./index.css";
import { persistor, store } from "./src/state/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { kanbanReduxApi } from "./src/api/ReduxApiHandler.js";
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
import App from "./src/App.jsx";
import Home from "./src/screens/Home.jsx";
import Login from "./src/screens/Login.jsx";
import Signup from "./src/screens/Signup.jsx";
import TeamPage from "./src/screens/TeamPage.jsx";
import KanbanBoardPage from "./src/screens/KanbanBoardPage.jsx";
// const PrivateRoutes = (children) => {
//   const authenticated = useSelector((state) => state.userState.authenticated);
//   return authenticated ? (
//     <>
//       {children}
//       <Outlet />{" "}
//     </>
//   ) : (
//     <Navigate to="/login" />
//   );
// };

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
