"use client";

import { UserManager, UserManagerSettings } from "oidc-client";
const clientBaseUrl =
  process.env.NEXT_PUBLIC_CLIENT_BASE_URL ?? "http://localhost:3000";

const userManagerConfig: UserManagerSettings = {
  client_id: process.env.NEXT_PUBLIC_SPA_CLIENT_ID ?? "react.spa",
  authority: process.env.NEXT_PUBLIC_AUTHORITY_URL ?? "http://localhost:5001",
  redirect_uri: `${clientBaseUrl}/signin-callback`,
  response_type: "id_token token",
  post_logout_redirect_uri: clientBaseUrl,
  scope:
    "openid profile phone email IdentityServerApi conversation-api post-api",
  automaticSilentRenew: true,
  loadUserInfo: true,
  accessTokenExpiringNotificationTime: 60, // Notify 60 seconds before access token expires
};

const userManager = new UserManager(userManagerConfig);

userManager.events.addAccessTokenExpiring(() => {
  console.log("Access token expiring soon. Attempting silent renew...");
});

userManager.events.addAccessTokenExpired(async () => {
  console.log("Access token expired. Attempting to refresh token...");

  try {
    await userManager.signinSilent();
    console.log("Token refreshed successfully.");
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
});

// Optionally handle user loaded event
userManager.events.addUserLoaded((user) => {
  console.log("User loaded:", user);
});

// Start the UserManager
userManager.getUser().then((user) => {
  if (user && !user.expired) {
    console.log("User is logged in.");
  } else {
    console.log("User is not logged in.");
  }
});

export default userManager;
