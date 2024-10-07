import { signIn, useSession } from "next-auth/react";
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
  const { status } = useSession({
    required: true,
    onUnauthenticated: async () => {
      await signIn("duende-identityserver6");
    },
  });
  const isLoading = status === "loading";

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export { AuthGuard };
