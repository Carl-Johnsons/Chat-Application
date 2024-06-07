"use client";
import React, { useEffect } from "react";
import { ScreenSectionProvider } from "../../../context/ScreenSectionProvider";
import { useGlobalState, useSignalRConnection } from "@/hooks";
import { MemoizedModalContainer } from "@/components/Modal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [, setConnection] = useGlobalState("connection");

  const { connection } = useSignalRConnection();
  useEffect(() => {
    connection && setConnection(connection);
  }, [connection, setConnection]);
  return (
    <>
      <ScreenSectionProvider>{children}</ScreenSectionProvider>
      <MemoizedModalContainer />
    </>
  );
};

export default Layout;
