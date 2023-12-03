import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { kanbanApi } from "../api/ApiInstance";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { setNotAuthenticated } from "../state/UserState/userStateSlice";
export default function PrivateRoutes({ children }) {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.userState.authenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await kanbanApi.get("/api/user/checkAuth");
        console.log(response.status);

        if (response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login page
          // You can dispatch an action to update the Redux state accordingly
        } else {
          console.log(response);
        }
      } catch (error) {
        dispatch(setNotAuthenticated());
      }
    };

    checkAuth(); 
  }, []); 
// console.log(authStatus)
  if (authenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
