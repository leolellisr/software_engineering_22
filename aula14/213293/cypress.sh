#! /bin/bash
xhost +
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
docker run \
-it \
--name cypress \
--rm \
-d \
-h cypress \
-w /home/node \
-v ${SCRIPTPATH}/:/home/node/ \
--net=host \
--entrypoint=cypress \
-u node \
-e DISPLAY=$DISPLAY \
cypress/included:9.0.0 \
open