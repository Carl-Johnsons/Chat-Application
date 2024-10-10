import { AppLoading } from "@/components/shared";
import { signIn, useSession } from "next-auth/react";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated: async () => {
      await signIn("duende-identityserver6");
    },
  });
  const isLoading = status === "loading";

  if (isLoading) {
    return <AppLoading />;
  }

  return <>{children}</>;
};

export { AuthGuard };
