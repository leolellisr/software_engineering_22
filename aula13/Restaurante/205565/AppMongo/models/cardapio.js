var mongoose = require("mongoose");

conn1 = mongoose.createConnection('mongodb://mongo:27017/cardapio', {useNewUrlParser: true});

var Schema = mongoose.Schema;

var item = new Schema({
    "nome": String,
    "preco": Number,
    "prato": String
});

module.exports = conn1.model('cardapio', item);