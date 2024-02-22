import { useLocalStorage } from "@/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const RequireAuth = (Component: React.FC) => {
  const requireAuth = (props: any) => {
    const [isAuth] = useLocalStorage("isAuth");
    useEffect(() => {
      if (!isAuth()) {
        return redirect("/login");
      }
    }, [isAuth]);

    return <Component {...props} />;
  };

  return requireAuth;
};

export default RequireAuth;
