#!/bin/bash

# Set project root directory
project_root=$(pwd)

echo -e "\e[95mRestoring Nuget Package in api gateway service ....\e[0m"
(cd ./solutions/APIGatewaySolution/src/APIGateway && dotnet restore --packages "$project_root/data/nuget/api-gateway" --verbosity normal)
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in identity service ....\e[0m"
(cd ./solutions/IdentitySolution/DuendeIdentityServer && dotnet restore --packages "$project_root/data/nuget/identity-api" --verbosity normal)
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in conversation service ....\e[0m"
(cd ./solutions/ConversationSolution/src/ConversationService.API && dotnet restore --packages "$project_root/data/nuget/conversation-api" --verbosity normal)
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in chat hub service ....\e[0m"
(cd ./solutions/ChatHubSolution/src/ChatHub && dotnet restore --packages "$project_root/data/nuget/websocket" --verbosity normal)
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in post service ....\e[0m"
(cd ./solutions/PostSolution/src/PostService.API && dotnet restore --packages "$project_root/data/nuget/post-api" --verbosity normal)
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in upload file service ....\e[0m"
(cd ./solutions/UploadFileSolution/src/UploadFileService.API && dotnet restore --packages "$project_root/data/nuget/upload-api" --verbosity normal)
cd "$project_root"

echo -e "\e[95mRestoring Nuget Package in upload file service ....\e[0m"
(cd ./solutions/NotificationSolution/src/NotificationService.API && dotnet restore --packages "$project_root/data/nuget/notification-api" --verbosity normal)
cd "$project_root"

# Publishing Contract solution
echo -e "\e[95mPublishing Contract solution ...\e[0m"
(cd ./solutions/Contract && dotnet publish)
cd "$project_root"