"use client";
import React from "react";
import { useAxiosInterceptor } from "../../hooks";
import { ScreenSectionProvider } from "../../context/ScreenSectionProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useAxiosInterceptor();
  return <ScreenSectionProvider>{children}</ScreenSectionProvider>;
};

export default Layout;
