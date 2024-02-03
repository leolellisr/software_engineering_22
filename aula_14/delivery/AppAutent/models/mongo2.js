var mongoose = require("mongoose");
conn2 = mongoose.createConnection('mongodb://mongo:27017/usersDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var usersSchema = new Schema({
    "user": String,
    "pass": String,
    "cargo": String
});
module.exports = conn2.model('users', usersSchema);
