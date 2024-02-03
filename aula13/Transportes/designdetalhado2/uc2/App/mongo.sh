#! /bin/bash
docker run \
-it \
--name mongo \
--rm \
-d \
-h mongo \
-v /opt/mongodb:/data/db \
--net=ea202 \
mongo:latest
