"use client";
import { resetGlobalState, useLocalStorage } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import userManager from "app/oidc-client";
import React, { useEffect } from "react";

const LogOut = () => {
  const queryClient = useQueryClient();
  const [, , removeLocalToken] = useLocalStorage("access_token");
  useEffect(() => {
    const handleLogout = async () => {
      resetGlobalState();
      queryClient.removeQueries({
        queryKey: ["currentUser"],
      });
      queryClient.removeQueries({
        queryKey: ["friendList"],
      });
      queryClient.removeQueries({
        queryKey: ["friendRequestList"],
      });
      queryClient.removeQueries({
        queryKey: ["blockList"],
      });
      queryClient.removeQueries({
        queryKey: ["conversations"],
      });
      queryClient.removeQueries({
        queryKey: ["messageList"],
      });
      queryClient.removeQueries({
        queryKey: ["posts"],
      });
      removeLocalToken();
      await userManager.signoutRedirect();
    };
    handleLogout();
  });

  return <div>Logging out...</div>;
};

export default LogOut;
