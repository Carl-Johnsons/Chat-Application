@echo off
set "currentDir=%cd%"
set chatServiceDir=%currentDir%\ChatService
cd %chatServiceDir%
dotnet run --launch-profile "https"