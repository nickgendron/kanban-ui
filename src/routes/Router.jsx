import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import App from "../App.jsx";
import Home from "../screens/Home.jsx";
import Login from "../screens/Login.jsx";
import Signup from "../screens/Signup.jsx";
import TeamPage from "../screens/TeamPage.jsx";
import KanbanBoardPage from "../screens/KanbanBoardPage.jsx";
const PrivateRoutes = (children) => {
  const authenticated = useSelector((state) => state.userState.authenticated);
  return authenticated ? (
    <>
      {children}
      <Outlet />{" "}
    </>
  ) : (
    <Navigate to="/login" />
  );
};
const RootAppRouter = () => {
  return (
    <Router >
      <Routes>
        {/* <Route element={<PrivateRoutes />}> */}
        <Route path="/team" element={<TeamPage />} />
        <Route path="/project" element={<KanbanBoardPage />} />
        {/* </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default RootAppRouter;

// const Router = createBrowserRouter([
//   { path: "/app", element: createPrivateRoute(<App />) },
//   { path: "/", element: createPrivateRoute(<Home />) },
//   { path: "/team", element: createPrivateRoute(<TeamPage />) },
//   { path: "/project", element: createPrivateRoute(<KanbanBoardPage />) },
//   { path: "/login", element: <Login /> },
//   { path: "/signup", element: <Signup /> },
// ]);
