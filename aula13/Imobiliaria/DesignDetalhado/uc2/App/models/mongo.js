var mongoose = require("mongoose");
conn1 = mongoose.createConnection("mongodb://mongo:27017/user", {
  useNewUrlParser: true,
});
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: String,
  age: Number,
  rg: Number,
  cpf: Number,
  email: String,
  phone: Number,
  user: String,
  password: String,
});
module.exports = conn1.model("user", userSchema);
