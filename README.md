# Chat-Application

This project is for education purpose and takes inspiration from Zalo

## Requirements:
- Docker (**latest**)
- Strong connection (to download library when building services)
- Ram at least 16GB (8GB still okay but your machine won't make it)
- Core: 4

## Install Docker
- Run docker engine or "Docker desktop (Window)" in your local machine
- Download docker engine: https://docs.docker.com/engine/install/ 


## Set up project
- Run "**setup-env.bat**" to init the environment for each service
- Run docker command at the root of the project to init all services.
    ``` shell
    docker compose up
    ```
- Setup **rabbitmq** (Only do it once):
    + Navigate to (*http://localhost:15672*) login with account **guest**/**guest**.
    + Go to tab "**Admin**" add new user with username "**admin**" and password "**pass**", set tag "**Admin**".
    + Click new user "**admin**" in user list and click "**Set permission**" button to allow other service to run the message queue
- Run "**apply-all-migrations.bat**" (To apply all migrations, obviously)
- Kill all services, then run docker command again in order to let other services to connect to **rabbitmq**
    ``` shell
    docker compose up
    ```
- Navigate to (*http://localhost:3001*) to see the UI
