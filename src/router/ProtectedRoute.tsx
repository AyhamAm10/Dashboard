import React from "react";
import { redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProtectedRouteProps extends RouteProps {
  allowedRoles: Array<"admin" | "superAdmin" | "sellManager">;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  ...rest
}) => {
  const { isAuthenticated, userType } = useSelector(
    (state: RootState) => state.user
  );

  if (!isAuthenticated || !userType || !allowedRoles.includes(userType)) {
    console.log("is not Authenticated");
    return redirect("/login");
  }

  return <Route {...rest} />;
};

export default ProtectedRoute;
