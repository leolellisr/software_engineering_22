var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/usuariosDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var usuarioSchema = new Schema({
    "usuario": String,
    "papel": String,
    "password": String
});
module.exports = conn1.model('usuarios', usuarioSchema);
