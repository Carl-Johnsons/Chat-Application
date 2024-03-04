@echo off
cmd /k docker-compose down --rmi all
echo All service has been removed from the machine except volume!
pause