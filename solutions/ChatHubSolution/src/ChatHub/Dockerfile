#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ChatHubSolution/src/ChatHub/ChatHub.csproj", "ChatHubSolution/src/ChatHub/"]
RUN dotnet restore "./ChatHubSolution/src/ChatHub/ChatHub.csproj"
COPY ["ChatHubSolution/src/", "ChatHubSolution/src/"]

WORKDIR "/src/ChatHubSolution/src/ChatHub"
RUN dotnet build "./ChatHub.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ChatHub.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ChatHub.dll"]