import { logout } from "@/services/auth/logout.service";
import { resetGlobalState } from "./globalState";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  return () => {
    router.push("/login");
    // Perform the state reset after the component has been rendered
    resetGlobalState();
    const fetchLogout = async () => {
      await logout();
    };
    fetchLogout();
  };
};

export { useLogout };
