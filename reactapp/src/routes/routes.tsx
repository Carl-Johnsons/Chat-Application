import { RouteProps } from "react-router-dom";

import { HomePage } from "../pages/Home";
import { NotFoundPage } from "../pages/NotFound";
import { LoginPage } from "../pages/Login";
import { LogoutPage } from "../pages/Logout";

const routes: Array<RouteProps> = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />,
  },
];

export default routes;
