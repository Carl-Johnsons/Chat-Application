import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { resetGlobalState } from "../../GlobalState";

const Logout = () => {
  useEffect(() => {
    // Perform the state reset after the component has been rendered
    resetGlobalState();
  }, []);
  localStorage.removeItem("accessToken");
  return <Navigate to={"/login"} replace={true} />;
};

export default Logout;
