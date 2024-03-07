"use client";
import React from "react";
import { useAxiosInterceptor } from "../../hooks";
import { ScreenSectionProvider } from "../../context/ScreenSectionProvider";
import RequireAuth from "@/components/Auth/RequireAuth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useAxiosInterceptor();
  return <ScreenSectionProvider>{children}</ScreenSectionProvider>;
};

export default RequireAuth(Layout);
