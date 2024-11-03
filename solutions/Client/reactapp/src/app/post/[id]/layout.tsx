"use client";
import React from "react";
import { MemoizedModalContainer } from "@/components/Modal";
import { ScreenSectionProvider } from "contexts/ScreenSectionContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ScreenSectionProvider>{children}</ScreenSectionProvider>
      <MemoizedModalContainer />
    </>
  );
};

export default Layout;
