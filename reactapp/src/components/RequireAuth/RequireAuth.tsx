import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLocalStorageItem } from "../../utils/LocalStorageUtils";

const RequireAuth = () => {
  const auth = getLocalStorageItem("isAuthenticated") ?? false;
  const location = useLocation();
  return (
    <>
      {auth ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
