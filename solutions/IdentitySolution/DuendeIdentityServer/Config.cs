using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using Serilog;

namespace DuendeIdentityServer;

public static class Config
{
    public static string GetConnectionString()
    {
        DotNetEnv.Env.Load(".env");
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production")
        {
            DotNetEnv.Env.Load(".env.production");
        }

        var server = DotNetEnv.Env.GetString("DB_SERVER", "localhost, 2001").Trim();
        var db = DotNetEnv.Env.GetString("DB", "Not found").Trim();
        var pwd = DotNetEnv.Env.GetString("SA_PASSWORD", "Not found").Trim();
        var connectionString = $"Server={server};Database={db};User Id=sa;Password='{pwd}';TrustServerCertificate=true";
        Log.Information(connectionString);
        return connectionString;
    }
    public static IEnumerable<IdentityResource> IdentityResources =>
               [
                   new IdentityResources.OpenId(),
                   new IdentityResources.Profile(),
                   new IdentityResources.Phone(),
                   new IdentityResources.Email(),
               ];

    public static IEnumerable<ApiScope> ApiScopes =>
        [
            new ApiScope(IdentityServerConstants.LocalApi.ScopeName),
            new ApiScope("conversation-api"),
            new ApiScope("post-api")
        ];

    public static IEnumerable<Client> Clients
    {
        get
        {
            DotNetEnv.Env.Load(".env");
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production")
            {
                DotNetEnv.Env.Load(".env.production");
            }

            var reactUrl = Environment.GetEnvironmentVariable("REACT_URL") ?? "http://localhost:3000";

            return [
                // m2m client credentials flow client
                new Client
                {
                    ClientId = "m2m.client",
                    ClientName = "Client Credentials Client",

                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                    AllowedScopes = { "scope1" }
                },
                new Client
                {
                    ClientId = "react.spa",
                    ClientName = "React SPA",
                    RequireClientSecret = false, // TODO: add secret later
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    AllowAccessTokensViaBrowser = false,
                    AlwaysIncludeUserClaimsInIdToken = true, // Attach user claim for SPA client
                    AccessTokenLifetime = 2592000,
                    RedirectUris = {
                       $"{reactUrl}/api/auth/callback/duende-identityserver6",
                       "https://www.getpostman.com/oauth2/callback"
                    },
                    PostLogoutRedirectUris ={reactUrl},
                    AllowedCorsOrigins = { reactUrl, "https://www.getpostman.com" },
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Phone,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.LocalApi.ScopeName,
                        "conversation-api",
                        "post-api"
                    },
                },
                new Client{
                    ClientId="android.client",
                    ClientName = "Android client",
                    AllowedGrantTypes= GrantTypes.Code,
                    RequirePkce = true,
                    RequireConsent = false,
                    RequireClientSecret=false, // TODO: add secret later
                    RefreshTokenUsage = TokenUsage.ReUse,
                    RedirectUris = {
                       "chat-application://oauth2callback",
                       "https://www.getpostman.com/oauth2/callback"
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Phone,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.LocalApi.ScopeName,
                        "conversation-api",
                        "post-api",
                        IdentityServerConstants.StandardScopes.OfflineAccess
                    },
                    AllowOfflineAccess = true
                }
            ];
        }
    }
}
