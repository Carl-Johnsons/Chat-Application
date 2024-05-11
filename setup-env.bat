@echo off
set "project_root=%CD%"
echo Pulling global env file .... &&^
npx dotenv-vault@latest pull &&^
echo Pulling api gateway env file .... &&^
cd .\solutions\APIGatewaySolution\src\APIGateway &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo Pulling identity service env file .... &&^
cd .\solutions\IdentitySolution\IdentityServer &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo Pulling conversation service env file .... &&^
cd .\solutions\ConversationSolution\src\ConversationService.API &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo Pulling chat hub service env file .... &&^
cd .\solutions\ChatHubSolution\src\ChatHub &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo Pulling upload file service env file .... &&^
cd .\solutions\UploadFileSolution\src\UploadFileService.API &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%"
pause