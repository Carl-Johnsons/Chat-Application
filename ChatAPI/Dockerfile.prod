#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ChatAPI/ChatAPI.csproj", "ChatAPI/"]
COPY ["BusinessObject/BussinessObject.csproj", "BusinessObject/"]
COPY ["DataAccess/DataAccess.csproj", "DataAccess/"]
RUN dotnet restore "./ChatAPI/./ChatAPI.csproj"
COPY . .
WORKDIR "/src/ChatAPI"
RUN dotnet build "./ChatAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ChatAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY ./ChatAPI/certificate.pem .
COPY ./ChatAPI/key.pem .
ENTRYPOINT ["dotnet", "ChatAPI.dll"]