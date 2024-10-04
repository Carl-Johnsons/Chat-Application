FROM mcr.microsoft.com/mssql/server:2022-latest
WORKDIR /docker-entrypoint-initdb.d
USER root
# Install dos2unix and clear after done conversion
# Change init.sh file window line ending to Unix line ending
RUN apt-get update && \
    apt-get install -y --no-install-recommends dos2unix

COPY --chmod=755 ./sh/init.sh init.sh

RUN dos2unix ./init.sh && \
    apt-get purge -y --auto-remove dos2unix && \
    rm -rf /var/lib/apt/lists/*
USER mssql

ENTRYPOINT ["/bin/bash", "init.sh"]