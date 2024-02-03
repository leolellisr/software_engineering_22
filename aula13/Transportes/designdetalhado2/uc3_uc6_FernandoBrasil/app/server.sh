#! /bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
docker network create ea202
./mongo.sh

docker run \
-it \
--name node.js \
--rm \
-d \
-h node.js \
-w /node \
-v ${SCRIPTPATH}/:/node/ \
-p 3000:3000 \
--net=ea202 \
node

docker exec node.js bash server_aux.sh

./start.sh
