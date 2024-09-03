using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace DuendeIdentityServer;

public static class Config
{
    public static string GetConnectionString()
    {
        DotNetEnv.Env.Load(".env");
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
        {
            DotNetEnv.Env.Load(".env.development");
        }

        var server = DotNetEnv.Env.GetString("SERVER", "Not found").Trim();
        var db = DotNetEnv.Env.GetString("DB", "Not found").Trim();
        var pwd = DotNetEnv.Env.GetString("SA_PASSWORD", "Not found").Trim();
        var connectionString = $"Server={server};Database={db};User Id=sa;Password='{pwd}';TrustServerCertificate=true";
        Console.WriteLine(connectionString);
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

    public static IEnumerable<Client> Clients =>
        [
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
                AllowedGrantTypes = GrantTypes.Implicit,
                RequirePkce = true,
                AllowAccessTokensViaBrowser = true,
                AlwaysIncludeUserClaimsInIdToken = true, // Attach user claim for SPA client
                AccessTokenLifetime = 3600,
                RedirectUris = {
                   "http://localhost:3000/signin-callback",
                   "http://localhost:3001/signin-callback",
                   "https://www.getpostman.com/oauth2/callback"
                },
                PostLogoutRedirectUris ={"http://localhost:3000","http://localhost:3001"},
                AllowedCorsOrigins = { "http://localhost:3001", "http://localhost:3000","https://www.getpostman.com" },
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
