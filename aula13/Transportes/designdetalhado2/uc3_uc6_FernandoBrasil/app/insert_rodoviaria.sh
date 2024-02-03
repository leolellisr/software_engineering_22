echo "use rodoviariasDB" > inserir
echo "db.rodoviarias.insertOne({\"rodoviaria\":\""$1"\"})" >> inserir
docker exec -it mongo bash -c "cd; mongosh < inserir"
