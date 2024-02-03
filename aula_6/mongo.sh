#! /bin/bash
docker run \
-it \
--name mongo \
--rm \
-d \
-h mongo \
--net=ea202 \
mongo:latest

