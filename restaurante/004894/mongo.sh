#! /bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
docker run \
-it \
-v ${SCRIPTPATH}/db:/data/db \
-v ${SCRIPTPATH}:/root \
--name mongo \
--rm \
-d \
-h mongo \
--net=ea202 \
mongo:latest
