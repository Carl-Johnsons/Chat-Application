import { useGlobalState } from "../GlobalState";
import { refreshToken } from "../Utils/Api/AuthApi";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../Utils/LocalStorageUtils";

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
    console.log(newAccessToken);

    if (error || !newAccessToken) {
      removeLocalStorageItem("accessToken");
      setLocalStorageItem("isAuthenticated", false);
      return;
    }
    setLocalStorageItem("accessToken", newAccessToken);
    setLocalStorageItem("isAuthenticated", true);
    return newAccessToken;
  };
  return refresh;
};

export { useRefreshToken };
