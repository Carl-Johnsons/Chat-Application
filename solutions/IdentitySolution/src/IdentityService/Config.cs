// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using Serilog;
using System;
using System.Collections.Generic;

namespace IdentityService;

public static class Config
{
    private static readonly string M2MSecret;
    private static readonly string InteractiveSecret;
    static Config()
    {
        DotNetEnv.Env.Load(".env");
        M2MSecret = Environment.GetEnvironmentVariable("M2MSecret");
        InteractiveSecret = Environment.GetEnvironmentVariable("InteractiveSecret");
    }
    public static IEnumerable<IdentityResource> IdentityResources =>
               [
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
               ];

    public static IEnumerable<ApiScope> ApiScopes =>
        [
            new ApiScope("conversation-api"),
            new ApiScope("scope1"),
            new ApiScope("scope2"),
        ];

    public static IEnumerable<Client> Clients =>
        [
            // m2m client credentials flow client
            new Client
            {
                ClientId = "m2m.client",
                ClientName = "Client Credentials Client",

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets = { new Secret(M2MSecret.Sha256()) },

                AllowedScopes = { "scope1" , "conversation-api" }
            },

            // interactive client using code flow + pkce
            new Client
            {
                ClientId = "interactive",
                ClientSecrets = { new Secret(InteractiveSecret.Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,

                RedirectUris = { "https://localhost:44300/signin-oidc" },
                FrontChannelLogoutUri = "https://localhost:44300/signout-oidc",
                PostLogoutRedirectUris = { "https://localhost:44300/signout-callback-oidc" },

                AllowOfflineAccess = true,
                AllowedScopes = { "openid", "profile", "scope2" }
            },
        ];
}