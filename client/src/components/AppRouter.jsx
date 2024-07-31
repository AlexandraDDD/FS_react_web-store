import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { NOTFOUND_ROUTE } from "../utils/consts";
import AuthGuard from "../auth/AuthGuard";
import NotFound from "../pages/NotFound";
import { Context } from "..";

export const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={route.component}
          exact={route.exact}
        />
      ))}

      {privateRoutes.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={<AuthGuard>{route.component}</AuthGuard>}
          exact={route.exact}
        />
      ))}
      <Route path="/" element={<Navigate to="shop" />} />
      <Route path="*" element={<Navigate to="nf" />} />
    </Routes>
  );
};
