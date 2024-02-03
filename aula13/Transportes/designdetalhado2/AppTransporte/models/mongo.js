var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/usuariosDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var usuarioSchema = new Schema({
    "nome": String,
    "senha": String,
    "email": String,
    "telefone" : String
});
module.exports = conn1.model('usuarios', usuarioSchema);
conn2 = mongoose.createConnection('mongodb://mongo:27017/passagemDB', {useNewUrlParser: true});
var passagemSchema = new Schema({
    "passageiro": String,
    "idViagem": String,
    "poltrona" : String
});
module.exports = conn2.model('passagem', passagemSchema);
