#! /bin/bash
docker run \
-it \
-v ~/004894:/data/db \
--name mongo \
--rm \
-d \
-h mongo \
--net=ea202 \
mongo:latest
