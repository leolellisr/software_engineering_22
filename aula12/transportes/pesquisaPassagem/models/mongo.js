var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/usuariosDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var usuarioSchema = new Schema({
    "nome": String,
    "senha": String,
    "email": String,
    "telefone" : String,
    "idPassagens" : [Number]
});
module.exports = conn1.model('usuarios', usuarioSchema);
conn2 = mongoose.createConnection('mongodb://mongo:27017/viagensDB', {useNewUrlParser: true});
var viagensSchema = new Schema({
    "origem": String,
    "destino": String,
    "horarioPartida" : String,
    "horarioChegada" : String,
    "dataPartida" : String,
    "dataChegada" : String,
    "poltronas" : [{"ocupado": Boolean, "idPassagem": Number}]
});
module.exports = conn2.model('viagens', viagensSchema);