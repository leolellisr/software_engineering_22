var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

var mongoOpViagem = require('../models/mongo-viagem');
var mongoOpRodoviaria = require('../models/mongo-rodoviaria');

function checkAuth(req, res) {
  cookies = req.cookies;
  console.log(cookies);
  if(!cookies || !cookies.userAuth)
    return 'unauthorized';
  cauth = cookies.userAuth;
  var content = JSON.parse(cauth);
  //var nome = content.nome;
  var papel = content.papel;
  if (papel)
    return papel;
  return 'unauthorized';
}

// codigo abaixo adicionado para o processamento das requisições
// HTTP GET, POST, PUT, DELETE

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


// rodoviarias.html
router.route('/rodoviarias-webpage')
 .get(function(req, res) {  // GET
   var path = 'rodoviarias.html';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
 }
 );


// obter o menu dropdown de rodoviárias
router.route('/rodoviarias-dropdown-menu')
  .get(function(req, res) {  // GET
     if(checkAuth(req, res) != 'admin') {
        response = {"resultado": "Erro! Faça login como administrador!"};
        res.json(response);
        return;
     }
     var response = {};
     mongoOpRodoviaria.find({}).exec(function(erro, data) {
       if(erro) 
          response = {"resultado": "Falha de acesso ao BD"};
       else
          response = {"rodoviarias": data};
       res.json(response);
     }
     )
  }
  );


// admin cookie
router.route('/admin-cookie')
  .post(function(req, res) {  // POST
     var content = {"nome":'root', "papel":'admin'};
     res.cookie('userAuth', JSON.stringify(content), {'maxAge': 3600000*24*5});
     response = {"resultado": "Logado como administrador"};
     res.json(response);
  }
  )
  .delete(function(req, res) {  // DELETE
     if (checkAuth(req, res) != 'unauthorized') {
        res.clearCookie('userAuth');	 // remove cookie no cliente
        response = {"resultado": "Logout realizado com sucesso"};
      }
      else {
        response = {"resultado": "Falha de logout"};
      }
      res.json(response); 
  }
  );


// inclusao-exclusao-viagem.html
router.route('/pagina/inclusao-exclusao-viagem')
 .get(function(req, res) {  // GET
   var path = 'inclusao-exclusao-viagem.html';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
 }
 );


// operacoes sobre todas as viagens
router.route('/viagens')
  .get(function(req, res) {  // GET
     if(checkAuth(req, res) != 'admin') {
        response = {"resultado": "Erro! Faça login como administrador!"};
        res.json(response);
        return;
     }
     var response = {};
     mongoOpViagem.find({}).sort({idViagem: "desc"}).exec(function(erro, data) {
       if(erro) 
          response = {"resultado": "Falha de acesso ao BD"};
       else
          response = {"viagens": data};
       res.json(response);
     }
     )
  }
  )
  .post(function(req, res) {   // POST (cria)
     if(checkAuth(req, res) != 'admin') {
        response = {"resultado": "Erro! Faça login como administrador!"};
        res.json(response);
        return;
     }
     var query = {"idViagem": req.body.idViagem};
     var response = {};
     mongoOpViagem.findOne(query, function(erro, data) {
        if (data == null) {
           var db = new mongoOpViagem();
           db.idViagem = req.body.idViagem;
           db.qtdePassagens = req.body.qtdePassagens;
           db.origem = req.body.origem;
           db.destino = req.body.destino;
           db.partida = req.body.partida;
           db.chegada = req.body.chegada;

           for (var i = 1; i <= db.qtdePassagens; ++i) {
               db.passagens.push({idPassagem: db.idViagem.toString() + "P" + i.toString(), ocupado: false});
           }
           db.save(function(erro) {
             if(erro) response = {"resultado": "Falha de acesso ao BD"};
             else response = {"resultado": "Viagem #" + req.body.idViagem + " inserida com sucesso"};
             res.json(response);
            }
          )
        } else {
        response = {"resultado": "Viagem #" + req.body.idViagem + " já existente"};
            res.json(response);
        }
        }
      )
  }
  );


// operacoes sobre uma viagem (idViagem)
router.route('/viagens/:idViagem')
  .get(function(req, res) {   // GET
     if(checkAuth(req, res) != 'admin') {
        response = {"resultado": "Erro! Faça login como administrador!"};
        res.json(response);
        return;
      }
      var response = '';
      var query = {"idViagem": req.params.idViagem};
      mongoOpViagem.findOne(query, function(erro, data) {
         if(erro) response = {"resultado": "Falha de acesso ao BD"};
         else if (data == null) response = {"resultado": "Viagem #" + req.params.idViagem + " inexistente"};
         else response = {"viagem": [data]};
         res.json(response);
      }
      )
  }
  )
  .delete(function(req, res) {   // DELETE (remove)
     if(checkAuth(req, res) != 'admin') {
        response = {"resultado": "Erro! Faça login como administrador!"};
        res.json(response);
        return;
     }
     var response = {};
     var query = {"idViagem": req.params.idViagem};
      mongoOpViagem.findOneAndRemove(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
         else if (data == null) response = {"resultado": "Viagem #" + req.params.idViagem + " inexistente"};
         else response = {"resultado": "Viagem #" + req.params.idViagem + " removida com sucesso"};
         res.json(response);
         }
       )
  }
  );


router.route('/rodoviarias')      // operacoes sobre todas as rodoviárias
 .get(function(req, res) {        // GET
     if(checkAuth(req, res) != 'admin') {
       res.status(401).send('Unauthorized');
       return;
     }
     var response = {};
     mongoOpRodoviaria.find({}, function(erro, data) {
       if(erro)
          response = {"resultado": "falha de acesso ao BD"};
       else
          response = {"rodoviarias": data};
       res.json(response);
     }
     )
  }
  )
  .post(function(req, res) {   // POST (cria)
     if(checkAuth(req, res) != 'admin') {
       res.status(401).send('Unauthorized');
       return;
     }
     var query = {"rodoviaria": req.body.rodoviaria};
     var response = {};
     mongoOpRodoviaria.findOne(query, function(erro, data) {
        if (data == null) {
           var db = new mongoOpRodoviaria();
           db.rodoviaria = req.body.rodoviaria;
           db.save(function(erro) {
             if(erro) {
                 response = {"resultado": "falha de acesso ao BD"};
                 res.json(response);
             } else {
                 response = {"resultado": "rodoviária inserida"};
                 res.json(response);
              }
            }
          )
        } else {
            response = {"resultado": "rodoviária já existente"};
            res.json(response);
        }
        }
      )
    }
    );


router.route('/rodoviarias/:rodoviaria')   // operacoes sobre uma rodoviária
  .delete(function(req, res) {             // DELETE (remove)
     if(checkAuth(req, res) != 'admin') {
        res.status(401).send('Unauthorized');
        return;
     }
     var response = {};
     var query = {"rodoviaria": req.params.rodoviaria};
     mongoOpRodoviaria.findOneAndRemove(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
         else if (data == null) response = {"resultado": "rodoviária inexistente"};
         else response = {"resultado": "rodoviária removida"};
         res.json(response)
         }
       )
     }
     );




module.exports = router;
