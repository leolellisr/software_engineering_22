#! /bin/bash
docker exec -it mongo bash -c 'mongosh mongodb://mongo:27017/usersDB <<EOF
db.users.insert({
	user: "'"$1"'",
	pass:"'"$3"'",
	cargo:"'"$2"'"
})
EOF'
