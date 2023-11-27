import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import Home from "../screens/Home.jsx";
import Login from "../screens/Login.jsx";
import Signup from "../screens/Signup.jsx";
// import TeamList from "../screens/TeamList.jsx";
import TeamPage from "../screens/TeamPage.jsx";
// import AddNewTeam from "../screens/AddTeam.jsx";
import KanbanBoardPage from "../screens/KanbanBoardPage.jsx";

const Router = createBrowserRouter([
  { path: "/app", element: <App /> },
  { path: "/", element: <Home /> },
  { path: "/team", element: <TeamPage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
//   { path: "/team/add", element: <AddNewTeam /> },
  { path: "/project", element: <KanbanBoardPage /> },
]);

export default Router;
