var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/viagensDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var viagensSchema = new Schema({
    "origem": String,
    "destino": String,
    "horarioPartida" : String,
    "horarioChegada" : String,
    "dataPartida" : String,
    "dataChegada" : String,
    "poltronas" : [{"ocupado": Boolean, "idPassagem": Number}]
});
module.exports = conn1.model('viagens', viagensSchema);
