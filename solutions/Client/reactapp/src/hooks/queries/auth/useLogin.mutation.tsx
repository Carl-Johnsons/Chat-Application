import { useLocalStorage } from "@/hooks";
import { JwtToken } from "@/models";
import { axiosInstance } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface IUserLogin {
  phoneNumber: string;
  password: string;
}

 const login = async ({
  phoneNumber,
  password,
}: IUserLogin): Promise<JwtToken | null> => {
  const url = "/api/Auth/Login";
  const respone = await axiosInstance.post(url, { phoneNumber, password });
  return respone.data;
};

const useLogin = () => {
  const [, setIsAuth] = useLocalStorage("isAuth");
  const [, setAccessToken] = useLocalStorage("accessToken");
  const router = useRouter();
  return useMutation<JwtToken | null, Error, IUserLogin, unknown>({
    mutationFn: ({ phoneNumber, password }) => login({ phoneNumber, password }),
    onSuccess: (jwtToken) => {
      setIsAuth(true);
      setAccessToken(jwtToken);
      router.push("/");
    },
    onError: (error) => {
      console.error("Failed to login: " + error.message);
    },
  });
};

export { useLogin };
