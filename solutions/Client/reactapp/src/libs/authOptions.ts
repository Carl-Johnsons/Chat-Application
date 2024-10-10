import { v4 as uuidv4 } from "uuid";
import { DuendeISUser } from "next-auth/providers/duende-identity-server6";
import { OAuthUserConfig } from "next-auth/providers/oauth";

import { IDENTITY_SERVER_URL } from "@/constants/url.constant";

export const authOptions: OAuthUserConfig<DuendeISUser> = {
  clientId: process.env.DUENDE_IDS6_ID ?? "react.spa",
  clientSecret: "",
  issuer: IDENTITY_SERVER_URL,
  authorization: {
    params: {
      scope:
        "openid profile phone email IdentityServerApi conversation-api post-api",
      nonce: uuidv4(),
    },
  },
  checks: ["pkce", "nonce"],
  profile(profile) {
    console.log("Received profile:", profile);
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
    };
  },
};
