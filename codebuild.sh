#!/bin/bash

###
### DEPRECATED!!!
###
echo "It works!"
CONTAINER_NAME=739750115356.dkr.ecr.us-east-2.amazonaws.com/containerized-status-node

docker build -t $CONTAINER_NAME .

docker push $CONTAINER_NAME:latest

exit 0;