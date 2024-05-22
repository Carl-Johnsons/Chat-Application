:: https://gist.githubusercontent.com/mlocati/fdabcaeb8071d5c75a2d51712db24011/raw/b710612d6320df7e146508094e84b92b34c77d48/win10colors.cmd
@echo off
set "project_root=%CD%"

setlocal
:: read global .env file
FOR /F "tokens=*" %%i in ('type .env ^| findstr /V "^#"') do (
    SET %%i
)>nul
SET SERVER='%HOST_NAME%, %DB_PORT%' 

echo [96mHostname[0m      '%HOST_NAME%'
echo [96mDatabase port[0m '%DB_PORT%'
echo [96mPassword[0m      '%SA_PASSWORD%'
echo [96mServer[0m        '%SERVER%'


SET DB=%MessageDB%
echo [95mApplying Conversation Service Migrations ....[0m &&^
echo [96mDB=[0m'%DB%' &&^
cd .\solutions\ConversationSolution\src\ConversationService.Infrastructure &&^
dotnet ef database update &&^
cd "%project_root%"

SET DB=%IdentityDB%
echo [96mApplying Identity Service Migrations ....[0m &&^
echo [96mDB=[0m'%DB%' &&^
cd .\solutions\IdentitySolution\DuendeIdentityServer &&^
dotnet ef database update &&^
cd "%project_root%"

endlocal



::cd .\solutions\IdentitySolution\DuendeIdentityServer &&^
::dotnet ef database update &&^
::cd "%project_root%" &&^




pause