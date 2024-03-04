import { useLocalStorage } from "@/hooks";
import { redirect } from "next/navigation";
import { JSXElementConstructor, useEffect } from "react";

const RequireAuth = (Component: JSXElementConstructor<any>) => {
  const requireAuth = (props: object) => {
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
