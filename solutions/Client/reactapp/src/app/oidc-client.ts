"use client";

import {
  UserManager,
  UserManagerSettings,
} from "oidc-client";
const clientBaseUrl =
  process.env.NEXT_PUBLIC_CLIENT_BASE_URL ?? "http://localhost:3000";

const userManagerConfig: UserManagerSettings = {
  client_id: process.env.NEXT_PUBLIC_SPA_CLIENT_ID ?? "react.spa",
  authority: process.env.NEXT_PUBLIC_AUTHORITY_URL ?? "http://localhost:5001",
  redirect_uri: `${clientBaseUrl}/signin-callback`,
  response_type: "id_token token",
  post_logout_redirect_uri: clientBaseUrl,
  scope: "openid profile phone email IdentityServerApi conversation-api",
};

const userManager = new UserManager(userManagerConfig);
export default userManager;
