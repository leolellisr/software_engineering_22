docker network create ea202
./mongo.sh
./node.sh
docker exec -it node.js bash -c "npm install && npm start"

