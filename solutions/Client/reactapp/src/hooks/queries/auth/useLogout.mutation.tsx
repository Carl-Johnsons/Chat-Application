import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { resetGlobalState, useLocalStorage } from "@/hooks";

export const logout = async (): Promise<number> => {
  const url = "/api/Auth/Logout";
  const respone = await axiosInstance.post(url);
  return respone.status;
};

const useLogout = () => {
  const [, , removeAcessToken] = useLocalStorage("accessToken");
  const [, , removeIsAuth] = useLocalStorage("isAuth");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      resetGlobalState();
      removeAcessToken();
      removeIsAuth();
      queryClient.removeQueries({
        queryKey: ["currentUser"],
      });
      queryClient.removeQueries({
        queryKey: ["friendList"],
      });
      queryClient.removeQueries({
        queryKey: ["friendRequestList"],
      });
      queryClient.removeQueries({
        queryKey: ["conversationList"],
      });
      queryClient.removeQueries({
        queryKey: ["messageList"],
      });
    },
    onError: (error) => {
      console.error("Failed to log out: " + error);
    },
  });
};

export { useLogout };
