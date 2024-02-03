var mongoose = require("mongoose");
conn1 = mongoose.createConnection("mongodb://mongo:27017/property", {
  useNewUrlParser: true,
});
var Schema = mongoose.Schema;
var propertySchema = new Schema({
  name: String,
  adress: String,
  size: Number,
  furnished: Boolean,
  price: Number,
  availability: String,
});
module.exports = conn1.model("property", propertySchema);
