"use client";

import { UserManager, UserManagerSettings } from "oidc-client";


const userManagerConfig: UserManagerSettings = {
  client_id: "react.spa",
  authority: "http://localhost:5001",
  redirect_uri: "http://localhost:3000/signin-callback",
  response_type: "id_token token",
  post_logout_redirect_uri: "http://localhost:3000",
  scope: "openid profile phone email",
};

const userManager = new UserManager(userManagerConfig);
export default userManager;
