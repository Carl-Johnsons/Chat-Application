#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["PostSolution/src/PostService.API/PostService.API.csproj", "PostSolution/src/PostService.API/"]
COPY ["PostSolution/src/PostService.Application/PostService.Application.csproj", "PostSolution/src/PostService.Application/"]
COPY ["PostSolution/src/PostService.Infrastructure/PostService.Infrastructure.csproj", "PostSolution/src/PostService.Infrastructure/"]
COPY ["PostSolution/src/PostService.Domain/PostService.Domain.csproj", "PostSolution/src/PostService.Domain/"]

RUN dotnet restore "./PostSolution/src/PostService.API/PostService.API.csproj" --verbosity normal

COPY ["PostSolution/src","PostSolution/src"]
WORKDIR "/src/PostSolution/src/PostService.API"
RUN dotnet build "./PostService.API.csproj" --no-restore -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PostService.API.csproj" --no-restore --no-build -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PostService.API.dll"]