FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["CadastroPessoasApi/CadastroPessoasApi.csproj", "CadastroPessoasApi/"]
RUN dotnet restore "CadastroPessoasApi/CadastroPessoasApi.csproj"
COPY . .
WORKDIR "/src/CadastroPessoasApi"
RUN dotnet build "CadastroPessoasApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CadastroPessoasApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CadastroPessoasApi.dll"]