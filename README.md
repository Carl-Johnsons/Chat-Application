# Chat-Application

This project is for education purpose and takes inspiration from Zalo

## 1. Set up the chatAPI
- Open cmd with OpenSSL or git bash with OpenSSL

- Run this line will create a key.pem and certificate.pem for security usage at the root of the chatAPI project
```shell
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```
### Install OpenSSL: https://stackoverflow.com/questions/50625283/how-to-install-openssl-in-windows-10

## 2. Config the repo
- Run setup-env.bat

## 3. Run services with Docker
- Run docker engine or "Docker desktop (Window)" in your local machine
- Download docker engine: https://docs.docker.com/engine/install/ 
- Run StartAllService.bat at the root of the repo to start ChatService, ChatAPI, ChatDB and react-app in docker
- Access to http://localhost:3001 to see the result
### RAM Usage: Need at least 3.5Gb for docker
