# Chat-Application

This project is for education purpose and takes inpiration from Zalo

## 1. Set up the chatAPI
- Open cmd with OpenSSL or git bash with OpenSSL

- Run this line will create a key.pem and certificate.pem for security usage at the root of the chatAPI project
```shell
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```
### Install OpenSSL: https://stackoverflow.com/questions/50625283/how-to-install-openssl-in-windows-10

## 2. Config the repo
- Create a .env file and put it at the root of the repo
- Fill out the information like this:

```
# server
# =========== Secret ===========
# Db
SA_PASSWORD="<your db password>"
# Imgur
Imgur__ClientID="<your imgur client id>"
Imgur__ClientSecret="<your imgur client secret>"
# =========== Secret ===========

# server
HOST_NAME="localhost"
# Ports
API__PORT="7191"
HUB__PORT="7235"
CLIENT__PORT="3001"
DB__PORT="2001"
# .NET env variable
ASPNETCORE_ENVIRONMENT="Development"
Logging__LogLevel__Microsoft.AspNetCore="Warning"
Logging__LogLevel__Microsoft.AspNetCore.Hosting.Diagnostics="Trace"
# Db
ACCEPT_EULA="Y"
ConnectionString="Server=chat-db;Database=chatApplication;User Id=sa;Password='${SA_PASSWORD}';TrustServerCertificate=true"
# Client
NEXT_PUBLIC_BASE_API_URL="http://${HOST_NAME}:${API__PORT}"
NEXT_PUBLIC_SIGNALR_URL="http://${HOST_NAME}:${HUB__PORT}/chatHub"
NEXT_PUBLIC_PORT="${CLIENT__PORT}"
# JWT
Jwt__Issuer="http://${HOST_NAME}:${CLIENT__PORT}"
Jwt__Audience="http://${HOST_NAME}:${CLIENT__PORT}"
```

## 3. Run services with Docker
- Run docker engine or "Docker desktop (Window)" in your local machine
- Download docker engine: https://docs.docker.com/engine/install/ 
- Run StartAllService.bat at the root of the repo to start ChatService, ChatAPI, ChatDB and react-app in docker
- Access to http://localhost:3001 to see the result
### RAM Usage: Need at least 3.5Gb for docker
