"use client";
import userManager from "app/oidc-client";
import React, { useEffect } from "react";

const LogOut = () => {
  useEffect(() => {
    const handleLogout = async () => {
      await userManager.signoutRedirect();
    };
    handleLogout();
  });

  return <div>Logging out...</div>;
};

export default LogOut;
