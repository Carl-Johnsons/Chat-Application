FROM mcr.microsoft.com/mssql/server:2022-latest
WORKDIR /docker-entrypoint-initdb.d
COPY --chmod=755 ./sh/init.sh init.sh
ENTRYPOINT ["/bin/bash", "init.sh"]