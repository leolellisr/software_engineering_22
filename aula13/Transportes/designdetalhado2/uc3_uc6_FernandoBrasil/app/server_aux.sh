npm install -g express express-generator
express servidor
cd servidor
mkdir models
mv routes/index.js routes/index-orig.js
cp ../mongo-viagem.js models/mongo-viagem.js
cp ../mongo-rodoviaria.js models/mongo-rodoviaria.js
cp ../index.js routes/index.js
cp ../index.html index.html
cp ../inclusao-exclusao-viagem.html inclusao-exclusao-viagem.html
cp ../rodoviarias.html rodoviarias.html
npm install mongoose
npm install
npm audit fix --force
npm audit fix --force
npm audit fix --force
