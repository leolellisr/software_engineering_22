var express = require("express");
var router = express.Router();
var mongoOp = require("../models/mongo");

router.route("/*").options(function (req, res) {
  // OPTIONS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Request-With"
  );
  res.sendStatus(200);
});

router.route("/").get(function (req, res) {
  const path = "index.html";
  res.header("Cache-Control", "no-cache");
  res.sendFile(path, { root: "./" });
});

router.route("/cadastro").get(function (req, res) {
  const path = "public/cadastro.html";
  res.header("Cache-Control", "no-cache");
  res.sendFile(path, { root: "./" });
});


router.route("/css/style.css").get(function (req, res) {
  const path = "public/stylesheets/style.css";
  res.header("Cache-Control", "no-cache");
  res.sendFile(path, { root: "./" });
});

router.route("/user").post((req, res) => {
  const query = { user: req.body.user };

  mongoOp.findOne(query, function (error, data) {
    if (data == null) {
      const db = new mongoOp();

      db.name = req.body.name;
      db.age = req.body.age;
      db.rg = req.body.rg;
      db.cpf = req.body.cpf;
      db.email = req.body.email;
      db.phone = req.body.phone;
      db.user = req.body.user;
      db.password = req.body.password;

      db.save(function (erro) {
        res.status(200).json({ status: "Usuario criado" });
      });
    } else {
      res.status(409).json({ error: "Usuario ja existe" });
    }
  });
});

module.exports = router;
