#! /bin/bash
echo "use usuariosDB" > inserir
echo "db.usuarios.insertOne({\"usuario\":\""$1"\", \"papel\":\""$2"\", \"password\":\""$3"\"})" >> inserir
docker exec -it mongo bash -c "cd; mongosh < inserir"
rm inserir
#echo $1 $2 $3
#docker exec -it mongo bash
#mongo
#use usuariosDB
#bd.usuarios.insertOne({"usuarios":"$1", "papel":"$2", "password":"$3" })
