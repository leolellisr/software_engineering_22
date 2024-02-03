var express = require('express');
var router = express.Router();
module.exports = router;

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

var mongoOp = require('../models/mongo-status');

router.route('/')
 .get(function(req, res) {  // GET
   var path = 'altera-status-pedido.html';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
   }
 );

 router.route('/css/style.css')
 .get(function(req, res) {  // GET
   var path = 'css/style.css';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
   }
 );

 router.route('/pedidos/:pedido') 
 .put(function(req, res) {   // PUT (altera)
    var response = {};
    var query = {"id": req.params.id};
    var data = {"status": req.body.status};
    mongoOp.findOneAndUpdate(query, data, function(erro, data) {
        if(erro) response = {"resultado": "falha de acesso ao DB"};
        else if (data == null) 
        response = {"resultado": "aluno inexistente"};
        else response = {"resultado": "pedido atualizado"};
        res.json(response);  
      }
    )
  }
)