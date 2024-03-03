FROM mcr.microsoft.com/mssql/server:2022-latest
WORKDIR /usr/src/app

ENV ACCEPT_EULA Y
ENV MSSQL_SA_PASSWORD PejOPjrzzBFkWnU0uJtevbZxEzyMfOWV

EXPOSE 1433

COPY chatApplication.BAK ./chatApplication.BAK
# Run Microsoft SQL Server and initialization script (at the same time)
CMD /bin/bash /usr/src/app/run-initialization.sh & /opt/mssql/bin/sqlservr