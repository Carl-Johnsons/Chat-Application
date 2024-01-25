# Chat-Application

This project is for education purpose and takes inpiration from Zalo

## Set up the chatAPI

- Create the appsettings.json and put it at the root of the chatAPI project

- Inside the json paste this format:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "Default": "Your database url"
  },
  "Jwt": {
    "Key": "Your secrect key",
    "Issuer": "Your issuer url",
    "Audience": "Your audience url"
  }
}
```
