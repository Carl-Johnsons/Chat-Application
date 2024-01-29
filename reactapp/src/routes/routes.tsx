import { RouteProps } from "react-router-dom";

import { HomePage } from "../pages/Home";
import { NotFoundPage } from "../pages/NotFound";
import { LoginPage } from "../pages/Login";
import { LogoutPage } from "../pages/Logout";

type Authentication = {
  auth?: boolean;
};

const routes: Array<RouteProps & Authentication> = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    auth: true,
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
