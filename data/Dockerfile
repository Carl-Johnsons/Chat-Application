FROM mcr.microsoft.com/mssql/server:2022-latest
WORKDIR /docker-entrypoint-initdb.d
USER root
# Install dos2unix and clear after done conversion
# Change init.sh file window line ending to Unix line ending
COPY --chmod=755 ./sh/init.sh init.sh
RUN apt-get update && \
    apt-get install -y dos2unix && \
    dos2unix ./init.sh && \
    apt-get remove -y dos2unix && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
USER mssql

ENTRYPOINT ["/bin/bash", "init.sh"]