var mongoose = require("mongoose");
conn2 = mongoose.createConnection('mongodb://mongo:27017/cardapioDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var bebidasSchema = new Schema({
    "nome": '',
    "preco": ''
});
var pratosSchema = new Schema({
    "nome": '',
    "preco": ''
});
var sobremesasSchema = new Schema({
    "nome": '',
    "preco": ''
});
var Sobremesas = conn2.model('sobremesas', sobremesasSchema);
var Bebidas = conn2.model('bebidas', bebidasSchema);
var Pratos = conn2.model('pratos', pratosSchema);
module.exports = {sobremesas:Sobremesas, bebidas:Bebidas, pratos:Pratos};
