import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { resetGlobalState } from "../../globalState";
import { logout } from "../../services/auth/logout.service";

const Logout = () => {
  useEffect(() => {
    // Perform the state reset after the component has been rendered
    resetGlobalState();
  }, []);
  useEffect(() => {
    const fetchLogout = async () => {
      await logout();
    };
    fetchLogout();
  }, []);
  return <Navigate to={"/login"} replace={true} />;
};

export default Logout;
