using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

var issuer = Environment.GetEnvironmentVariable("Jwt__Issuer");
var audience = Environment.GetEnvironmentVariable("Jwt__Audience");
var builder = WebApplication.CreateBuilder(args);
var service = builder.Services;


// Add services to the container.
//Reference: https://blog.devgenius.io/jwt-authentication-in-asp-net-core-e67dca9ae3e8
/*
 * Configure validation of JWT signed with a private asymmetric key.
 * 
 * We'll use a public key to validate if the token was signed
 * with the corresponding private key.
 */
service.AddSingleton<RsaSecurityKey>(provider =>
{
    // It's required to register the RSA key with depedency injection.
    // If you don't do this, the RSA instance will be prematurely disposed.
    var certificatePath = "certificate.pem";
    var certificate = new X509Certificate2(certificatePath);
    var publicKeyByte = certificate.GetPublicKey();
    var rsaPublicKey = RSA.Create();
    rsaPublicKey.ImportRSAPublicKey(publicKeyByte, out _);
    return new RsaSecurityKey(rsaPublicKey);
});

service.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        SecurityKey rsa = service.BuildServiceProvider().GetRequiredService<RsaSecurityKey>();
        options.IncludeErrorDetails = true; // <- great for debugging
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = rsa,
            RequireExpirationTime = true, // <- JWTs are required to have "exp" property set
            ValidateLifetime = true, // <- the "exp" will be validated
            ClockSkew = TimeSpan.Zero, // Make the jwt token expire time more accurate
            ValidIssuer = issuer,
            ValidAudience = audience,
        };
    });

service.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
service.AddEndpointsApiExplorer();
service.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization(); // Can use [Authorize] middleware

app.UseAuthorization();

app.MapControllers();

app.Run();
