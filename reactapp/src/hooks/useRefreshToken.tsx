import { refreshToken } from "@/services/auth";
import { useLocalStorage } from ".";

const useRefreshToken = () => {
  const [, setAccessToken, removeAccessToken] = useLocalStorage("accessToken");
  const [, setIsAuth, removeIsAuth] = useLocalStorage("isAuth");
  const refresh = async () => {
    const [newAccessToken, error] = await refreshToken();

    if (error || !newAccessToken) {
      removeAccessToken();
      removeIsAuth();
      return null;
    }
    setAccessToken(newAccessToken);
    setIsAuth(true);
    return newAccessToken;
  };
  return refresh;
};

export { useRefreshToken };
