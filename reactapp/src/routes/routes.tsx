import { Navigate, RouteProps } from "react-router-dom";

import { HomePage } from "../pages/Home";
import { NotFoundPage } from "../pages/NotFound";
import { LoginPage } from "../pages/Login";

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
    element: <Navigate to={"/login"} replace={true} />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />,
  },
];

export default routes;
