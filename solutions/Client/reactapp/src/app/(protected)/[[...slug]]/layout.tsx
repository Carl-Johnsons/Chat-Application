"use client";
import React from "react";
import { ScreenSectionProvider } from "../../../contexts/ScreenSectionContext";
import { MemoizedModalContainer } from "@/components/Modal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ScreenSectionProvider>{children}</ScreenSectionProvider>
      <MemoizedModalContainer />
    </>
  );
};

export default Layout;
