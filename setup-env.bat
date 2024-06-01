@echo off
set "project_root=%CD%"
echo [95mPulling global env file ....[0m &&^
npx dotenv-vault@latest pull &&^
echo [95mPulling api gateway env file ....[0m &&^
cd .\solutions\APIGatewaySolution\src\APIGateway &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo [95mPulling identity service env file ....[0m &&^
cd .\solutions\IdentitySolution\DuendeIdentityServer &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo [95mPulling conversation service env file ....[0m &&^
cd .\solutions\ConversationSolution\src\ConversationService.API &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo [95mPulling chat hub service env file ....[0m &&^
cd .\solutions\ChatHubSolution\src\ChatHub &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo [95mPulling upload file service env file ....[0m &&^
cd .\solutions\PostSolution\src\PostService.API &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo [95mPulling post service env file ....[0m &&^
cd .\solutions\UploadFileSolution\src\UploadFileService.API &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo [95mPulling react-app env file ....[0m &&^
cd .\solutions\Client\reactapp &&^
npx dotenv-vault@latest pull &&^
cd "%project_root%" &&^
echo [95mPublishing Contract solution ...[0m &&^
cd .\solutions\Contract &&^
dotnet publish &&^
cd "%project_root%"
pause