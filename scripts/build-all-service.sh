#!/bin/bash

# Set project root directory
project_root=$(pwd)

echo -e "\e[95mRestoring Nuget Package in api gateway service ....\e[0m"
(cd ./solutions/APIGatewaySolution/src/APIGateway && dotnet restore --packages "$project_root/data/nuget/api-gateway")
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in identity service ....\e[0m"
(cd ./solutions/IdentitySolution/DuendeIdentityServer && dotnet restore --packages "$project_root/data/nuget/identity-api")
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in conversation service ....\e[0m"
(cd ./solutions/ConversationSolution/src/ConversationService.API && dotnet restore --packages "$project_root/data/nuget/conversation-api")
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in chat hub service ....\e[0m"
(cd ./solutions/ChatHubSolution/src/ChatHub && dotnet restore --packages "$project_root/data/nuget/websocket")
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in post service ....\e[0m"
(cd ./solutions/PostSolution/src/PostService.API && dotnet restore --packages "$project_root/data/nuget/post-api")
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in upload file service ....\e[0m"
(cd ./solutions/UploadFileSolution/src/UploadFileService.API && dotnet restore --packages "$project_root/data/nuget/upload-api")
cd "$project_root"

# Publishing Contract solution
echo -e "\e[95mPublishing Contract solution ...\e[0m"
(cd ./solutions/Contract && dotnet publish)
cd "$project_root"