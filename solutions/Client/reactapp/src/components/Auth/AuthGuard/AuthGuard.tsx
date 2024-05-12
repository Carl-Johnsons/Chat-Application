import userManager from "app/oidc-client";
import { Suspense, useEffect } from "react";

const Loading = () => {
  return <div>Loading...</div>;
};

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handleLogin = async () => {
      const user = await userManager.getUser();
      if (!user) {
        await userManager.signinRedirect();
      }
    };
    handleLogin();
  }, []);

  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export { AuthGuard };
