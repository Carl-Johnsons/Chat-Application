import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { resetGlobalState, useLocalStorage } from "@/hooks";

export const logout = async (): Promise<number> => {
  const url = "/api/Auth/Logout";
  const respone = await axiosInstance.post(url);
  return respone.status;
};

const useLogout = () => {
  const router = useRouter();
  const [, , removeAcessToken] = useLocalStorage("accessToken");
  const [, , removeIsAuth] = useLocalStorage("isAuth");

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      resetGlobalState();
      removeAcessToken();
      removeIsAuth();
      router.push("/login");
    },
    onError: (error) => {
      console.log("Failed to log out: " + error);
    },
  });
};

export { useLogout };
