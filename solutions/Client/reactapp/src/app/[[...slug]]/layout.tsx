"use client";
import React, { useEffect } from "react";
import { ScreenSectionProvider } from "../../context/ScreenSectionProvider";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { useGlobalState, useSignalRConnection } from "@/hooks";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [, setConnection] = useGlobalState("connection");

  const { connection } = useSignalRConnection();
  useEffect(() => {
    connection && setConnection(connection);
  }, [connection, setConnection]);
  return (
    <AuthGuard>
      <ScreenSectionProvider>{children}</ScreenSectionProvider>
    </AuthGuard>
  );
};

export default Layout;
