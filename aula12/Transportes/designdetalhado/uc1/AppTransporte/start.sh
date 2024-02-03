docker network create ea202
./mongo.sh
./node.sh
docker exec -it node.js npm install mongoose
docker exec -it node.js npm install
docker exec -it node.js npm start
