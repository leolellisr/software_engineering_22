#!/bin/sh

docker exec -it mongo bash -c "mongo --eval 'db.users.insertOne({username: \"$1\", role: \"$2\", pass: \"$3\"})' usersDB"