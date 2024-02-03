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
-p 80:80 \
node
