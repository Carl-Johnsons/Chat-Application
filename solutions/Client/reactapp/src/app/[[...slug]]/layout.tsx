"use client";
import React from "react";
import { useAxiosInterceptor } from "../../hooks";
import { ScreenSectionProvider } from "../../context/ScreenSectionProvider";
import { AuthGuard } from "@/components/Auth/AuthGuard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useAxiosInterceptor();
  return (
    <AuthGuard>
      <ScreenSectionProvider>{children}</ScreenSectionProvider>
    </AuthGuard>
  );
};

export default Layout;
