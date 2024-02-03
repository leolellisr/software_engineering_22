#! /bin/bash
docker run \
-it \
--name mongo \
--rm \
-d \
-h mongo \
-v students-data:/data/db \
--net=ea202 \
mongo:latest
