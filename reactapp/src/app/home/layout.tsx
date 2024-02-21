"use client";
import React from "react";
import { useAxiosInterceptor } from "../../hooks";
import { ScreenSectionProvider } from "../../context/ScreenSectionProvider";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  useAxiosInterceptor();
  return <ScreenSectionProvider>{children}</ScreenSectionProvider>;
};

export default Layout;
