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

router.route('/viagens')   // operacoes sobre todas as viagens
 .get(function(req, res) {  // GET
     var response = {};
     mongoOp.find({}, function(erro, data) {
       if(erro) 
          response = {"resultado": "falha de acesso ao BD"};
        else
          response = {"viagens": data};
        res.json(response);
        }
      )
    }
  );


router.route('/viagens/:origem/:destino')   // operacoes sobre uma viagem
  .get(function(req, res) {   // GET
      var response = {};
      var query = {"origem": req.params.origem, "destino": req.params.destino};
      mongoOp.find(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
         
         else if (data == null) response = {"resultado": "viagem inexistente"};
         else response = {"viagens": data};
         res.json(response);
        }
      )
    }
  );
  /*
  .put(function(req, res) {   // PUT (altera)
      var response = {};
      var query = {"ra": req.params.ra};
      var data = {"nome": req.body.nome, "curso": req.body.curso};
      mongoOp.findOneAndUpdate(query, data, function(erro, data) {
          if(erro) response = {"resultado": "falha de acesso ao DB"};
	  else if (data == null) response = {"resultado": "aluno inexistente"};
          else response = {"resultado": "aluno atualizado"};
          res.json(response);  
        }
      )
    }
  )
  
  .delete(function(req, res) {   // DELETE (remove)
     var response = {};
     var query = {"ra": req.params.ra};
      mongoOp.findOneAndRemove(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao DB"};
	 else if (data == null) response = {"resultado": "aluno inexistente"};
         else response = {"resultado": "aluno removido"};
         res.json(response);
         }
       )
     }
  );
  */

router.route('/viagens/:origem/:destino/:data')   // operacoes sobre uma viagem
  .get(function(req, res) {   // GET
      var response = {};
      var query = {"origem": req.params.origem, "destino": req.params.destino, "dataPartida": req.params.data.replace(".", "/")};
      mongoOp.findOne(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
         else if (data == null) response = {"resultado": "viagem inexistente"};
	 else response = {"viagens": [data]};
         res.json(response);
        }
      )
    }
  );



module.exports = router;
