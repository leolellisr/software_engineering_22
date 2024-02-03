#! /bin/bash
docker run \
-it \
--name mongo \
--rm \
-d \
-h mongo \
-v /mongo/data:/data/db \
--net=ea202 \
mongo:latest
