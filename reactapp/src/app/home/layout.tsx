"use client";
import React from "react";
import { useAxiosInterceptor } from "../../hooks";
import { ScreenSectionProvider } from "../../context/ScreenSectionProvider";
import RequireAuth from "@/components/Auth/RequireAuth";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  useAxiosInterceptor();
  return <ScreenSectionProvider>{children}</ScreenSectionProvider>;
};

export default RequireAuth(Layout);
