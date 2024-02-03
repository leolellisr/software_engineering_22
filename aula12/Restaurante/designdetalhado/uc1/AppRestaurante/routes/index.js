var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

var mongoOp = require('../models/mongo');

// alguns navegadores enviam uma requisicao OPTIONS antes de POST e PUT
router.route('/*') 
 .options(function(req, res) {  // OPTIONS
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Request-With');
   res.sendStatus(200);
   }
 );
 

// index.html
router.route('/')
 .get(function(req, res) {  // GET
   var path = 'index.html';
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


router.route('/pedidos')   // operacoes sobre todos os pedidos
 .get(function(req, res) {  // GET
     var response = {};
     mongoOp.find({}, function(erro, data) {
       if(erro) 
          response = {"resultado": "falha de acesso ao BD"};
        else
          response = {"pedidos": data};
        res.json(response);
        }
      )
    }
  )
  

router.route('/pedidos/:pedido')   // operacoes sobre um pedido (RA)
  .get(function(req, res) {   // GET
      var response = {};
      var query = {"pedido": req.params.pedido};
      mongoOp.findOne(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
         else if (data == null) response = {"resultado": "pedido inexistente"};
	 else response = {"pedidos": [data]};
         res.json(response);
        }
      )
    }
  )
  .put(function(req, res) {   // PUT (altera)
      var response = {};
      var query = {"pedido": req.params.pedido};
      var data = {"item": req.body.item, "quantidade": req.body.quantidade};
      mongoOp.findOneAndUpdate(query, data, function(erro, data) {
          if(erro) response = {"resultado": "falha de acesso ao DB"};
	  else if (data == null) response = {"resultado": "aluno inexistente"};
          else response = {"resultado": "aluno atualizado"};
          res.json(response);  
        }
      )
    }
  )
  



module.exports = router;
