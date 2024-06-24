"use client";
import userManager from "app/oidc-client";
import { useAxios } from "hooks/useAxios";
import { useLocalStorage } from "hooks/useStorage";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

/**
 * This page will automatically renew expiry token make a seamlessly 
 * experience for user
 * @returns
 */
const SilentSignInCallBack = () => {
  const router = useRouter();
  const { setAccessToken } = useAxios();
  const [localToken, setLocalToken] = useLocalStorage("access_token");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await userManager.signinSilentCallback();
      } catch (error) {
        console.error(error);
      }
      router.push("/");
    };
    handleCallback();
  }, [localToken, router, setAccessToken, setLocalToken]);

  return <div>Redirecting...</div>;
};

export default SilentSignInCallBack;
