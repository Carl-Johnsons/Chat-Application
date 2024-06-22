"use client";
import userManager from "app/oidc-client";
import { useAxios } from "hooks/useAxios";
import { useLocalStorage } from "hooks/useStorage";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

/**
 * This page will handle the callback after the user logs in
 * and then redirect them to the home page.
 * @returns
 */
const SignInCallBack = () => {
  const router = useRouter();
  const { setAccessToken } = useAxios();
  const [localToken, setLocalToken] = useLocalStorage("access_token");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const user = await userManager.signinRedirectCallback();
        setAccessToken(user.access_token ?? localToken);
        user.access_token && setLocalToken(user.access_token);
        console.log(user.access_token);
      } catch (error) {
        console.error(error);
      }
      router.push("/");
    };
    handleCallback();
  }, [localToken, router, setAccessToken, setLocalToken]);

  return <div>Redirecting...</div>;
};

export default SignInCallBack;
