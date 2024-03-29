import { useMutation } from "@tanstack/react-query";
import { JwtToken } from "@/models";
import { axiosInstance } from "@/utils";
import { useLocalStorage } from "@/hooks";
import { useRouter } from "next/navigation";

export const refreshToken = async (): Promise<JwtToken | null> => {
  const url = "/api/Auth/Refresh";
  const respone = await axiosInstance.get(url);
  const newAccessToken: JwtToken = respone.data;
  return newAccessToken;
};

const useRefreshToken = () => {
  const router = useRouter();
  const [, setAccessToken, removeAccessToken] = useLocalStorage("accessToken");
  const [, setIsAuth, removeIsAuth] = useLocalStorage("isAuth");

  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (newAccessToken) => {
      setAccessToken(newAccessToken);
      setIsAuth(true);
    },
    onError: (error) => {
      console.log("Failed to refresh token: " + error.message);
      removeAccessToken();
      removeIsAuth();
      router.push("/login");
    },
  });
};

export { useRefreshToken };
