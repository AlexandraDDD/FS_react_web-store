import { Component } from "react";
import Basket from "./pages/Basket";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import DevicePage from "./pages/DevicePage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  NOTFOUND_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/consts";

export const privateRoutes = [
  { path: ADMIN_ROUTE, component: <Admin />, exact: false, id: 11 },
  { path: BASKET_ROUTE, component: <Basket />, exact: true, id: 12 },
  {
    path: DEVICE_ROUTE + "/:id",
    component: <DevicePage />,
    exact: true,
    id: 14,
  },
];
export const publicRoutes = [
  { path: LOGIN_ROUTE, component: <Auth />, exact: true, id: 12 },
  { path: REGISTRATION_ROUTE, component: <Auth />, exact: true, id: 16 },
  { path: NOTFOUND_ROUTE, component: <NotFound />, exact: false, id: 15 },
  { path: SHOP_ROUTE, component: <Shop />, exact: true, id: 13 },
];
