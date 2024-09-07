import React from "react";
import { createHashRouter } from "react-router-dom";
import App from "./App";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import UserManagment from "./pages/UserManagment";
import UserManagmentUsers from "./pages/UserManagmentUsers";
import SellsUsers from "./pages/SellsUsers";

function RoleProtectedRoute({
  element,
  allowedRoles,
}: {
  element: React.ReactNode;
  allowedRoles: string[];
}): React.ReactElement | null {
  const { isAuthenticated, userType } = useSelector(
    (state: RootState) => state.user
  );

  console.log("Current user role:", userType);

  return userType && allowedRoles.includes(userType) && isAuthenticated ? (
    <>{element}</>
  ) : (
    <div>Access Denied</div>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/main-page",
    element: <App />,
    children: [
      {
        path: "/main-page/",
        element: <MainPage />,
      },
      {
        path: "app-users",
        element: (
          <RoleProtectedRoute
            element={<UserManagment />}
            allowedRoles={["admin"]}
          />
        ),
      },
      {
        path: "admin-users",
        element: (
          <RoleProtectedRoute
            element={<UserManagmentUsers />}
            allowedRoles={["superAdmin"]}
          />
        ),
      },

      {
        path: "sells",
        element: (
          <RoleProtectedRoute
            element={<SellsUsers />}
            allowedRoles={["sellManager"]}
          />
        ),
      },
    ],
  },
]);
