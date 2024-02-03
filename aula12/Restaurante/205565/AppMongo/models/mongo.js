var mongoose = require("mongoose");

conn1 = mongoose.createConnection('mongodb://mongo:27017/comandas', {useNewUrlParser: true});

var Schema = mongoose.Schema;

var item = new Schema({
    "quantidade": Number, "item": String,"preco": Number
});

var comanda = new Schema({
    "id": Number,
    "itens": [item]
});

module.exports = conn1.model('comanda', comanda);