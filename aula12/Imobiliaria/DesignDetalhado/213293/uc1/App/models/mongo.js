var mongoose = require("mongoose");
conn1 = mongoose.createConnection("mongodb://mongo:27017/property", {
  useNewUrlParser: true,
});
var Schema = mongoose.Schema;
var propertySchema = new Schema({
  adress: String,
  size: Number,
  furnished: Boolean,
  price: Number
});
module.exports = conn1.model("property", propertySchema);
