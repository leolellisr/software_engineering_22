var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/comandas', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var item = new Schema({
    "quantidade": Number,
    "itens": String
});

var comandasSchema = new Schema({
    "id": mongoose.Schema.Types.ObjectId,
    "itens": [item]
});

module.exports = conn1.model('comandas', comandasSchema);
