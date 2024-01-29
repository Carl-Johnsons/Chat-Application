import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { resetGlobalState } from "../../GlobalState";
import { removeLocalStorageItem } from "../../Utils/LocalStorageUtils";

const Logout = () => {
  useEffect(() => {
    // Perform the state reset after the component has been rendered
    resetGlobalState();
  }, []);
  removeLocalStorageItem("accessToken");
  removeLocalStorageItem("isAuthenticated");
  return <Navigate to={"/login"} replace={true} />;
};

export default Logout;
