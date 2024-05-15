import userManager from "app/oidc-client";
import { Suspense, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./AuthGuard.module.scss";
const cx = classNames.bind(style);
const Loading = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("loader")}></div>;
    </div>
  );
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
