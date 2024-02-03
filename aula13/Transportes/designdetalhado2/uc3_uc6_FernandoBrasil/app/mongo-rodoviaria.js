var mongoose = require("mongoose");
conn = mongoose.createConnection('mongodb://mongo:27017/rodoviariasDB', {useNewUrlParser: true});
var Schema = mongoose.Schema;
var rodoviariaSchema = new Schema({
    "rodoviaria": String
});
module.exports = conn.model('rodoviarias', rodoviariaSchema);
