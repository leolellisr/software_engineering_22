var mongoose = require("mongoose");
conn = mongoose.createConnection('mongodb://mongo:27017/viagensDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var viagemSchema = new Schema({
    "idViagem": Number,
    "qtdePassagens": Number,
    "origem": String,
    "destino": String,
    "partida": String,
    "chegada": String,
    "passagens": [{"idPassagem": String, "ocupado": Boolean}]
});
module.exports = conn.model('viagens', viagemSchema);
