#!/bin/bash

# Define variables
MYSQL_CONTAINER_NAME="mysqldb"
MYSQL_ROOT_PASSWORD="123456"
DUMP_FILE="./webserver/seed/world.sql"


#Import and execute the Dump File Directly

docker exec -i $MYSQL_CONTAINER_NAME mysql -uroot -p$MYSQL_ROOT_PASSWORD < $DUMP_FILE

# Check if the import was successful
if [ $? -eq 0 ]; then
  echo "Dump file imported successfully."
else
  echo "Error importing dump file."
fi