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

router.route("/cadastro-imovel").get(function (req, res) {
  const path = "public/cadastro-imovel.html";
  res.header("Cache-Control", "no-cache");
  res.sendFile(path, { root: "./" });
});

router.route("/catalogo").get(function (req, res) {
    const path = "public/catalogo.html";
    res.header("Cache-Control", "no-cache");
    res.sendFile(path, { root: "./" });
  });

router.route("/css/style.css").get(function (req, res) {
  const path = "public/stylesheets/style.css";
  res.header("Cache-Control", "no-cache");
  res.sendFile(path, { root: "./" });
});

router.route("/catalog").post((req, res) => {
  const query = { catalog: req.body.catalog };

  mongoOp.findOne(query, function(error, data) {
      if (data == null) {
          const db = new mongoOp();

          db.adress = req.body.adress;
          db.size = req.body.size;
          db.furnished = req.body.furnished;
          db.price = req.body.price;

          db.save(function(erro) {
              res.status(200).json({ status: "Imóvel cadastrado" });
          });
      } else {
          res.status(409).json({ error: "Endereço já cadastrado" });
      }
  });
});


module.exports = router;
