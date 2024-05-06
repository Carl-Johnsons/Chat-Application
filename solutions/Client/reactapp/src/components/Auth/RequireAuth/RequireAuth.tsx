import { useLocalStorage } from "@/hooks";
import { useRouter } from "next/navigation";
import { JSX, JSXElementConstructor, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RequireAuth = (Component: JSXElementConstructor<any>) => {
  const AuthenticatedComponent = (props: JSX.IntrinsicAttributes) => {
    const [getAccessToken] = useLocalStorage("accessToken");
    const router = useRouter();

    useEffect(() => {
      if (!getAccessToken()) {
        router.push("/login");
      }
    });

    return <Component {...props} />;
  };
  return AuthenticatedComponent;
};

export default RequireAuth;
