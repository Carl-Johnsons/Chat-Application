# Chat-Application

This project is for education purpose and takes inpiration from Zalo

## 1. Set up the chatAPI
- Open cmd with OpenSSL or git bash with OpenSSL

- Run this line will create a key.pem and certificate.pem for security usage at the root of the chatAPI project
```shell
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```
### Install OpenSSL: https://stackoverflow.com/questions/50625283/how-to-install-openssl-in-windows-10

- Next, Create an appsettings.json and put it at the root of the chatAPI project

- Inside the json file paste as follow:
### NOTE: the issuer must have no trailing "/" Example: wrong url: https://localhost:7093/
```json
{
  "ConnectionStrings": {
    "Default": "Your database url"
  },
  "Jwt": {
    "Issuer": "Your issuer url",
    "Audience": "Your audience url"
  },
  "Imgur": {
    "ClientID": "Your Imgur Client ID",
    "ClientSecret": "Your Imgur Client secret"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

## 2. Set up chat service to enable real-time communicating (SignalR)
- Create an appsettings.json and put at the root of the chatService project

- Inside the json file paste as follow:

```json
{
  "ClientPort": {
    "Default": [Your client port]
  },
  "ConnectionStrings": {
    "Default": "[Your db connection string]"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

## 3. Set up the react app

- Create a file .env and put it at the root of the react project

- Then put these in your .env file

```env
NEXT_PUBLIC_BASE_API_URL="Your URL"
NEXT_PUBLIC_SIGNALR_URL="[Hub URL]/chatHub"
NEXT_PUBLIC_PORT="Your react app port"
```
## 4. Run services with Docker
- Run docker engine or "Docker desktop (Window)" in your local machine
- Download docker egine: https://docs.docker.com/engine/install/ 
- Run StartAllService.bat at the root of the repo to start ChatService, ChatAPI and ChatDB in docker

## 5. Run react app:

- Open terminal at the root of reactApp project
- Run this to initialize the react app in development
```bat
npm run dev
```
- Or run this in production
```bat
npm run build
npm run preview
```

