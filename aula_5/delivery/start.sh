#! /bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

docker exec -it node.js npm start
