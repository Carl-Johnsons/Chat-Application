#!/bin/bash

# Set project root directory
project_root=$(pwd)

# Pull global env file
echo -e "\e[95mPulling global env file ....\e[0m"
npx dotenv-vault@latest pull

# Pull API Gateway env file
echo -e "\e[95mPulling api gateway env file ....\e[0m"
(cd ./solutions/APIGatewaySolution/src/APIGateway && npx dotenv-vault@latest pull)
cd "$project_root"

# Pull Identity Service env file
echo -e "\e[95mPulling identity service env file ....\e[0m"
(cd ./solutions/IdentitySolution/DuendeIdentityServer && npx dotenv-vault@latest pull)
cd "$project_root"

# Pull Conversation Service env file
echo -e "\e[95mPulling conversation service env file ....\e[0m"
(cd ./solutions/ConversationSolution/src/ConversationService.API && npx dotenv-vault@latest pull)
cd "$project_root"

# Pull Chat Hub Service env file
echo -e "\e[95mPulling chat hub service env file ....\e[0m"
(cd ./solutions/ChatHubSolution/src/ChatHub && npx dotenv-vault@latest pull)
cd "$project_root"

# Pull Upload File Service env file
echo -e "\e[95mPulling upload file service env file ....\e[0m"
(cd ./solutions/PostSolution/src/PostService.API && npx dotenv-vault@latest pull)
cd "$project_root"

# Pull Post Service env file
echo -e "\e[95mPulling post service env file ....\e[0m"
(cd ./solutions/UploadFileSolution/src/UploadFileService.API && npx dotenv-vault@latest pull)
cd "$project_root"

# Pull React App env file
echo -e "\e[95mPulling react-app env file ....\e[0m"
(cd ./solutions/Client/reactapp && npx dotenv-vault@latest pull)
cd "$project_root"
