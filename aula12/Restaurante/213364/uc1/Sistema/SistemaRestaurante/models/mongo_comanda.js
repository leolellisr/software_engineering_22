var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/comandaDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var comandaSchema = new Schema({
    "id": '',
    "itens": [],
    "preco_total": '',
    "preco_pago": ''
});
module.exports = conn1.model('comandas', comandaSchema);
