"use client";
import { AuthGuard } from "@/components/Auth/AuthGuard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default Layout;
