#!/bin/bash
server="sql-server"
username="sa"
password="$SA_PASSWORD" 
script_file="create_database.sql"

indentityDB="$IndentityDB"
messageDB="$MessageDB"

# Create SQL script file
cat <<EOF >$script_file
USE master;
IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = '$indentityDB')
BEGIN
    CREATE DATABASE $indentityDB;
END
IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = '$messageDB')
BEGIN
    CREATE DATABASE $messageDB;
END
EOF

/opt/mssql-tools/bin/sqlcmd -S $server -U $username -P $password -i $script_file
# Check if the command was successful
if [ $? -eq 0 ]; then
    echo "Database creation '$indentityDB', '$messageDB' script executed successfully!"
else
    echo "Error executing database creation script"
fi

# Remove the script file
rm $script_file