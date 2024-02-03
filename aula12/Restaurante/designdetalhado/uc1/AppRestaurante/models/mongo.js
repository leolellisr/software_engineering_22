var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/pedidosDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var pedidoSchema = new Schema({
    "pedido": String,
    "item": String,
    "quantidade": Number,
    "status": String,
});
module.exports = conn1.model('pedidos', pedidoSchema);
