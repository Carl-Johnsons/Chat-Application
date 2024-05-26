#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ConversationSolution/src/ConversationService.API/ConversationService.API.csproj", "ConversationSolution/src/ConversationService.API/"]
COPY ["ConversationSolution/src/ConversationService.Application/ConversationService.Application.csproj", "ConversationSolution/src/ConversationService.Application/"]
COPY ["ConversationSolution/src/ConversationService.Domain/ConversationService.Domain.csproj", "ConversationSolution/src/ConversationService.Domain/"]
COPY ["ConversationSolution/src/ConversationService.Infrastructure/ConversationService.Infrastructure.csproj", "ConversationSolution/src/ConversationService.Infrastructure/"]
COPY ["Contract/Contract/bin/Release/net8.0/Contract.dll", "ConversationSolution/src/ConversationService.Application/"]

RUN dotnet restore "./ConversationSolution/src/ConversationService.API/ConversationService.API.csproj"
COPY ["ConversationSolution/src","ConversationSolution/src"]
WORKDIR "/src/ConversationSolution/src/ConversationService.API"
RUN dotnet build "./ConversationService.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ConversationService.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ConversationService.API.dll"]