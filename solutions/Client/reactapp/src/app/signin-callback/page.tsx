"use client";
import userManager from "app/oidc-client";
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
  const [, setAccessToken] = useLocalStorage("access_token");

  useEffect(() => {
    const handleCallback = async () => {
      const user = await userManager.signinRedirectCallback();
      setAccessToken(user.access_token);
      router.push("/");
    };
    handleCallback();
  }, [router, setAccessToken]);

  return <div>Redirecting...</div>;
};

export default SignInCallBack;
