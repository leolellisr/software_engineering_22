var mongoose = require("mongoose");
conn1 = mongoose.createConnection('mongodb://mongo:27017/usersDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var userSchema = new Schema({
    "user": String,
    "role": String,
    "pass": String
});
module.exports = conn1.model('users', userSchema);
