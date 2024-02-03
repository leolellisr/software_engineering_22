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
-p 3000:3000 \
node

#docker exec -it node.js npm install -g express express-generator
./start.sh
