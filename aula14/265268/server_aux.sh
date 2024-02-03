npm install -g express express-generator
express servidor
cd servidor
mkdir models
mv routes/index.js routes/index-orig.js
cp ../mongo.js models/mongo.js
cp ../mongo-usuarios.js models/mongo-usuarios.js
cp ../index.js routes/index.js
cp ../index.html index.html
cp ../login.html login.html
cp ../usuarios.html usuarios.html
npm install mongoose
npm install
npm audit fix --force
npm audit fix --force
npm audit fix --force
