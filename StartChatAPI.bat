@echo off
set "currentDir=%cd%"
set chatAPIDir=%currentDir%\ChatAPI
cd %chatAPIDir%
dotnet run --launch-profile "https"