import { useGlobalState } from "../globalState";
import { refreshToken } from "../services/auth/refreshToken.service";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../utils/LocalStorageUtils";

const useRefreshToken = () => {
  const [userId] = useGlobalState("userId");
  const [userMap] = useGlobalState("userMap");
  const currentUser = userMap.get(userId);
  if (!currentUser) {
    return null;
  }

  const refresh = async () => {
    const [newAccessToken, error] = await refreshToken({
      refreshToken: currentUser.refreshToken,
    });

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
