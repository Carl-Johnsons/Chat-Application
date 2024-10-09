"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { resetGlobalState } from "@/hooks";
import { CLIENT_BASE_URL, IDENTITY_SERVER_URL } from "@/constants/url.constant";

const LogOut = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

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

      // Get the idToken before delete the session in "client"
      const idToken = session?.idToken;

      // delete the session in "client"
      await signOut({
        redirect: false,
      });

      // Delete the session in "server"
      if (idToken) {
        const logoutUrl = `${IDENTITY_SERVER_URL}/connect/endsession?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
          CLIENT_BASE_URL
        )}`;
        window.location.href = logoutUrl;
      } else {
        console.error(
          "No ID token found for the user. Unable to log out from Duende IdentityServer."
        );
      }
    };
    handleLogout();
  }, [queryClient, session?.idToken]);

  return <div>Logging out...</div>;
};

export default LogOut;
