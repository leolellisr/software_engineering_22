#! /bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
docker run \
-it \
--name node.js \
--rm \
-d \
-h node.js \
-w /node \
-v ${SCRIPTPATH}/:/node/ \
-p 2020:2020 \
node

docker exec -it node.js node hello_world.js
