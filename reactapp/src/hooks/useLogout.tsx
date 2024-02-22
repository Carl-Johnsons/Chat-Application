import { logout } from "@/services/auth";
import { resetGlobalState } from "./globalState";
import { useRouter } from "next/navigation";
import { useLocalStorage } from ".";

const useLogout = () => {
  const router = useRouter();
  const [, , removeAcessToken] = useLocalStorage("accessToken");
  const [, , removeIsAuth] = useLocalStorage("isAuth");
  return () => {
    // Perform the state reset after the component has been rendered
    resetGlobalState();
    removeAcessToken();
    removeIsAuth();
    const fetchLogout = async () => {
      await logout();
    };
    fetchLogout();

    router.push("/login");
  };
};

export { useLogout };
