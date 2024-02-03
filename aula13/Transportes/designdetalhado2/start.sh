sudo docker network create ea202
sudo ./mongo.sh
sudo ./node.sh
sudo docker exec -it node.js npm install
sudo docker exec -it node.js npm start
