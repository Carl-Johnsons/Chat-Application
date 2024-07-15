import userManager from "app/oidc-client";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./AuthGuard.module.scss";
const cx = classNames.bind(style);
const Loading = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("loader")}></div>
    </div>
  );
};

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLogin = async () => {
      setIsLoading(true);
      try {
        const user = await userManager.getUser();
        if (!user) {
          await userManager.signinRedirect();
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleLogin();
  }, []);

  if (!isAuthenticated) {
    return null;
  }
  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export { AuthGuard };
