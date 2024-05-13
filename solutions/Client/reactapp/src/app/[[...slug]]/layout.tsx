"use client";
import React from "react";
import { ScreenSectionProvider } from "../../context/ScreenSectionProvider";
import { AuthGuard } from "@/components/Auth/AuthGuard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <ScreenSectionProvider>{children}</ScreenSectionProvider>
    </AuthGuard>
  );
};

export default Layout;
