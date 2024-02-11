import { refreshToken } from "../services/auth/refreshToken.service";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../utils/LocalStorageUtils";

const useRefreshToken = () => {
  const refresh = async () => {
    const [newAccessToken, error] = await refreshToken();

    if (error || !newAccessToken) {
      removeLocalStorageItem("accessToken");
      setLocalStorageItem("isAuthenticated", false);
      return null;
    }
    setLocalStorageItem("accessToken", newAccessToken);
    setLocalStorageItem("isAuthenticated", true);
    return newAccessToken;
  };
  return refresh;
};

export { useRefreshToken };
