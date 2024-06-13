"use client";
import React from "react";
import { ScreenSectionProvider } from "../../contexts/ScreenSectionContext";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { MemoizedModalContainer } from "@/components/Modal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <ScreenSectionProvider>{children}</ScreenSectionProvider>
      <MemoizedModalContainer />
    </AuthGuard>
  );
};

export default Layout;
