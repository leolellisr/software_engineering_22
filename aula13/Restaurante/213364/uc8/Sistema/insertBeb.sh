#! /bin/bash
docker exec -it mongo bash -c 'mongo mongodb://mongo:27017/cardapioDB <<EOF
db.bebidas.insert({
	nome: "'"$1"'",
	preco: "'"$2"'"
})
EOF'
