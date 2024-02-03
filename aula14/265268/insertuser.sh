echo "use usuariosDB" > inserir
echo "db.usuarios.insertOne({\"nome\":\""$1"\", \"senha\":\""$3"\", \"papel\":\""$2"\"})" >> inserir
docker exec -it mongo bash -c "cd; mongosh < inserir"
