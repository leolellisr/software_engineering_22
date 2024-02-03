#! /bin/bash
docker container stop mongo
docker container stop node
bash mongo.sh
bash node.sh
