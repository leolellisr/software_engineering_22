#! /bin/bash
docker run \
-it \
--name mongo \
--rm \
-d \
-h mongo \
-v "${SCRIPTPATH}/DataBase/:/data/db/" \
--net=ea202 \
mongo:latest
