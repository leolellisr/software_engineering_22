#! /bin/bash
docker network create ea202
docker run \
-it \
--name mongo \
--rm \
-d \
-h mongo \
-v ~/205565:/data/db \
--net=ea202 \
mongo:latest
