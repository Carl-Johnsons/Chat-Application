# Chat-Application

This project is for education purpose and takes inpiration from Zalo

## 1. Set up the chatAPI

- Create the appsettings.json and put it at the root of the chatAPI project

- Inside the json paste this format:
### NOTE: the issuer must have no trailing "/" Example: wrong url: https://localhost:7093/
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

## 2. Set up the react app

- Create a file .env and put it at the root of the react project

- Then put these in your .env file

```.env
VITE_BASE_API_URL="Your URL"
VITE_SIGNALR_URL="Hub URL"
VITE_PORT="Your react app port"
```