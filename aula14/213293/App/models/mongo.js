var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/alunosDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var alunoSchema = new Schema({
    "ra": String,
    "nome": String,
    "curso": String
});
module.exports = conn1.model('alunos', alunoSchema);
