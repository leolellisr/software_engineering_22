#! /bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
docker run \
-it \
--name mongo \
--rm \
-d \
-h mongo \
-v ${SCRIPTPATH}/:/root \
-v ${SCRIPTPATH}/mongo_data/:/data/db/ \
--net=ea202 \
mongo:latest

#./insert_rodoviaria.sh RoddoTietedeSaoPauloSP
