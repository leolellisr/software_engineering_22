var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/usuariosDB', { useNewUrlParser: true });
var Schema = mongoose.Schema;
var usuariosSchema = new Schema({
    "nome": String,
    "senha": String,
    "email": String,
    "telefone": String
});
module.exports = conn1.model('usuarios', usuariosSchema);